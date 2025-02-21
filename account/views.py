from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from account.serializers import UserRegistrationSerializer,UserLoginSerializer,UserProfileSerializer,UserChangePasswordSerializer,SendPasswordResetEmailSerializer,UserPasswordResetSerializer
from account.renderers import UserRenderer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from account.serializers import UserProfileUpdateSerializer
from .models import SkinAnalysis



def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    refresh['profile_completed'] = user.profile_completed


    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'profile_completed': user.profile_completed
    }

class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        try:
            if serializer.is_valid(raise_exception=True):
                user = serializer.save()
                token = get_tokens_for_user(user)
                return Response({'token': token, 'msg': 'Registration Success'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            # Log the error
            print("Registration Error:", str(e))
            # You might want to log this error to a logging system as well
            return Response({'error': 'Failed to register', 'details': str(serializer.errors)}, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = serializer.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            token = get_tokens_for_user(user)
            return Response({
                'token': token,
                'msg': 'Login Success',
                'user': {
                    'name': user.name,  # Ensure this is how the name is stored in your User model
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({'errors': {'non_field_errors': ['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)
    

class UserProfileView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def get(self, request, format=None):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
class UserChangePasswordView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Changed Successfully'}, status=status.HTTP_200_OK)

  
class SendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)

class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)


class UserProfileUpdateView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        user = request.user
        serializer = UserProfileUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            updated_user = serializer.save()
            # Check if certain required fields are filled out
            if all([updated_user.first_name, updated_user.last_name, updated_user.age, updated_user.gender]):
                updated_user.profile_completed = True
                updated_user.save()
                return Response({
                    'msg': 'Profile updated successfully',
                    'profile_completed': updated_user.profile_completed
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'msg': 'Profile update is incomplete, missing required fields.',
                    'profile_completed': updated_user.profile_completed
                }, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

def save_skin_analysis(request):
    if request.method == 'POST':
        user = request.user
        data = request.data
        analysis = SkinAnalysis(
            user=user,
            skin_disease=data['Skin disease'],
            acne_type=data.get('Acne type'),
            acne_grade=data.get('Acne grade'),
            acne_severity=data.get('Acne severity'),
        )
        analysis.save()
        return Response({"message": "Analysis saved successfully"}, status=status.HTTP_201_CREATED)
