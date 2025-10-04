import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';
import { ToastManager } from '../utils/toastHelpers';
import { Eye, EyeOff, AlertCircle, UserPlus } from 'lucide-react';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { validatePasswordStrength } from '../utils/passwordValidation';
import { ErrorDisplay } from './ErrorDisplay';

export function Login() {
  const { signIn, signUp, loading, user } = useAuth();
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({ email: '', password: '', name: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const [showAccountHint, setShowAccountHint] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setError('');
    setErrorCode('');
    setShowAccountHint(false);

    try {
      if (!signInForm.email || !signInForm.password) {
        setError('Please fill in all fields');
        return;
      }

      console.log('Login component: attempting sign in for:', signInForm.email);
      const result = await signIn(signInForm.email, signInForm.password);
      console.log('Login component: sign in result:', result);
      
      if (!result.success) {
        const errorMessage = result.error || 'Failed to sign in';
        console.log('Login component: setting error:', errorMessage);
        setError(errorMessage);
        setErrorCode(result.code || '');
        
        // If invalid credentials, provide enhanced guidance
        if (result.code === 'auth.invalid_credentials' || 
            errorMessage.includes('Invalid login credentials') || 
            errorMessage.includes('Invalid email or password')) {
          
          setError('Account not found. This email might not be registered yet.');
          setErrorCode('auth.invalid_credentials');
          setShowAccountHint(true);
          
          toast.error('Account not found. Creating an account first?', {
            description: 'If you\'re new, please use the Sign Up tab to create your account.',
            duration: 5000,
          });
          
          // Auto-switch to signup tab with email pre-filled after 4 seconds
          setTimeout(() => {
            if (!user && signInForm.email) { // Only switch if still not logged in and email exists
              setSignUpForm(prev => ({ ...prev, email: signInForm.email }));
              setActiveTab('signup');
              setError('');
              setErrorCode('');
              setShowAccountHint(false);
              toast.info('Switched to Sign Up tab with your email pre-filled.');
            }
          }, 4000);
        } else {
          toast.error(errorMessage);
        }
      } else {
        console.log('Login component: sign in successful, form should disappear');
        setError(''); // Clear any previous errors
        setErrorCode('');
        setShowAccountHint(false);
      }
    } catch (err) {
      console.error('Login component: unexpected error:', err);
      const errorMessage = 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setError('');
    setErrorCode('');
    setShowAccountHint(false);

    try {
      if (!signUpForm.email || !signUpForm.password || !signUpForm.name) {
        setError('Please fill in all fields');
        return;
      }

      if (signUpForm.password !== signUpForm.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      // Validate password strength
      const passwordValidation = validatePasswordStrength(signUpForm.password);
      if (!passwordValidation.isValid) {
        setError('Password does not meet security requirements. Please check the requirements below.');
        ToastManager.passwordStrengthError(passwordValidation.feedback);
        return;
      }

      const result = await signUp(signUpForm.email, signUpForm.password, signUpForm.name);
      if (!result.success) {
        const errorMessage = result.error || 'Failed to create account';
        setError(errorMessage);
        setErrorCode(result.code || '');
        toast.error(errorMessage);
        
        // If email already exists, switch to sign-in tab and pre-fill email
        if (result.code === 'auth.email_exists') {
          setSignInForm(prev => ({ ...prev, email: signUpForm.email }));
          setActiveTab('signin');
          toast.info('Switching to sign-in with your existing account.');
          setTimeout(() => {
            setError(''); // Clear error after switching
            setErrorCode('');
          }, 1000);
        }
      } else {
        toast.success('Account created! Please sign in with your credentials.');
        setSignUpForm({ email: '', password: '', name: '', confirmPassword: '' });
        setError(''); // Clear any previous errors
        setErrorCode('');
        // Switch to sign-in tab and pre-fill email
        setSignInForm(prev => ({ ...prev, email: signUpForm.email }));
        setActiveTab('signin');
      }
    } catch (err) {
      console.error('Sign up error:', err);
      const errorMessage = 'An unexpected error occurred during sign up. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSwitchToSignIn = () => {
    setActiveTab('signin');
    setError('');
    setErrorCode('');
    setShowAccountHint(false);
  };

  const handleCreateAccountClick = () => {
    setSignUpForm(prev => ({ ...prev, email: signInForm.email }));
    setActiveTab('signup');
    setError('');
    setErrorCode('');
    setShowAccountHint(false);
    toast.info('Create your account below');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl mb-2 leading-tight">
            <span className="hidden sm:inline">Automated Inventory Control System</span>
            <span className="sm:hidden">Inventory Control System</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Access your inventory management dashboard</p>
          <div className="mt-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs sm:text-sm text-blue-700">
              <strong>New Users:</strong> Please create an account using the Sign Up tab to get started with your personal inventory system.
            </p>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Welcome</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Enhanced Account Hint */}
            {showAccountHint && (
              <div className="mb-4">
                <Alert className="border-orange-200 bg-orange-50">
                  <UserPlus className="h-4 w-4" />
                  <AlertDescription className="text-orange-800">
                    <strong>Account not found!</strong> If you're new to the system, please create an account first.
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="p-0 h-auto text-orange-700 font-semibold underline ml-2"
                      onClick={handleCreateAccountClick}
                    >
                      Create Account Now
                    </Button>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {error && !showAccountHint && (
              <div className="mb-4">
                <ErrorDisplay 
                  error={error}
                  code={errorCode}
                  action={errorCode === 'auth.email_exists' ? 'signin' : 'retry'}
                  onSignIn={handleSwitchToSignIn}
                  onRetry={() => {
                    setError('');
                    setErrorCode('');
                  }}
                />
              </div>
            )}
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin" disabled={isSubmitting}>Sign In</TabsTrigger>
                <TabsTrigger value="signup" disabled={isSubmitting}>Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={signInForm.email}
                      onChange={(e) => {
                        setSignInForm(prev => ({ ...prev, email: e.target.value }));
                        // Clear error when user starts typing
                        if (error || showAccountHint) {
                          setError('');
                          setErrorCode('');
                          setShowAccountHint(false);
                        }
                      }}
                      placeholder="Enter your email"
                      disabled={loading || isSubmitting}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        type={showSignInPassword ? "text" : "password"}
                        value={signInForm.password}
                        onChange={(e) => {
                          setSignInForm(prev => ({ ...prev, password: e.target.value }));
                          // Clear error when user starts typing
                          if (error || showAccountHint) {
                            setError('');
                            setErrorCode('');
                            setShowAccountHint(false);
                          }
                        }}
                        placeholder="Enter your password"
                        disabled={loading || isSubmitting}
                        required
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowSignInPassword(!showSignInPassword)}
                        disabled={loading || isSubmitting}
                      >
                        {showSignInPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading || isSubmitting}>
                    {(loading || isSubmitting) ? 'Signing in...' : 'Sign In'}
                  </Button>
                  
                  <div className="text-center mt-4">
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setActiveTab('signup')}
                        className="text-primary hover:underline font-medium"
                        disabled={loading || isSubmitting}
                      >
                        Create one here
                      </button>
                    </p>
                  </div>

                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      value={signUpForm.name}
                      onChange={(e) => {
                        setSignUpForm(prev => ({ ...prev, name: e.target.value }));
                        // Clear error when user starts typing
                        if (error) {
                          setError('');
                          setErrorCode('');
                        }
                      }}
                      placeholder="Enter your full name"
                      disabled={loading}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signUpForm.email}
                      onChange={(e) => {
                        setSignUpForm(prev => ({ ...prev, email: e.target.value }));
                        // Clear error when user starts typing
                        if (error) {
                          setError('');
                          setErrorCode('');
                        }
                      }}
                      placeholder="Enter your email"
                      disabled={loading}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showSignUpPassword ? "text" : "password"}
                        value={signUpForm.password}
                        onChange={(e) => {
                          setSignUpForm(prev => ({ ...prev, password: e.target.value }));
                          // Clear error when user starts typing
                          if (error) {
                            setError('');
                            setErrorCode('');
                          }
                        }}
                        placeholder="Create a strong password"
                        disabled={loading}
                        required
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                        disabled={loading}
                      >
                        {showSignUpPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {/* Password Strength Indicator - Only show when user starts typing */}
                    {signUpForm.password && (
                      <PasswordStrengthIndicator password={signUpForm.password} />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-confirm"
                        type={showConfirmPassword ? "text" : "password"}
                        value={signUpForm.confirmPassword}
                        onChange={(e) => {
                          setSignUpForm(prev => ({ ...prev, confirmPassword: e.target.value }));
                          // Clear error when user starts typing
                          if (error) {
                            setError('');
                            setErrorCode('');
                          }
                        }}
                        placeholder="Confirm your password"
                        disabled={loading}
                        required
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={loading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading || isSubmitting}>
                    {(loading || isSubmitting) ? 'Creating Account...' : 'Create Account'}
                  </Button>
                  
                  <div className="text-center mt-4">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setActiveTab('signin')}
                        className="text-primary hover:underline font-medium"
                        disabled={loading || isSubmitting}
                      >
                        Sign in here
                      </button>
                    </p>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}