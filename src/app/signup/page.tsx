import { SignupForm } from '@/components/signup-form';
import { BackButton } from '@/components/back-button';

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center py-12 px-4 relative">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <SignupForm />
    </div>
  );
}
