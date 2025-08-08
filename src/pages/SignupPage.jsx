import { SignupForm } from "@/components/user/SignUpForm";

export default function SignupPage() {
  return (
    <div className="relative grid min-h-svh lg:grid-cols-2 overflow-hidden">

      <img
        src="/images/Gradient-2.svg"
        alt="top-left blob"
        className="absolute top-0 left-0 w-96 h-96 opacity-60 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
      />
      <img
        src="/images/Gradient.svg"
        alt="top-right blob"
        className="absolute top-0 right-0 w-48 h-48 opacity-60 transform translate-x-1/2 -translate-y-1/2 rotate-90 pointer-events-none z-10"
      />
      <img
        src="/images/Gradient.svg"
        alt="bottom-left blob"
        className="absolute bottom-0 left-0 w-72 h-72 opacity-60 transform -translate-x-1/2 translate-y-1/2 rotate-180 pointer-events-none z-10"
      />
      <img
        src="/images/Gradient-2.svg"
        alt="bottom-right blob"
        className="absolute bottom-0 right-0 w-48 h-48 lg:w-48 lg:h-48 opacity-60 transform translate-x-1/2 translate-y-1/2 rotate-[270deg] pointer-events-none z-10"
      />

      {/* Left: Form Section */}
      <div className="flex p-6 md:px-10 relative z-10">

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block z-0">
        <img
          src="/images/bg-cover.png"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
