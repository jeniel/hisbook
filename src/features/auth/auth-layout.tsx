interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex w-full max-w-7xl h-[80vh] rounded-lg overflow-hidden border ">

        {/* Login */}
        <div className="flex-1 flex flex-col justify-center items-center p-8">
          <div className="mb-4 text-center">
            <img
              src="/images/acebook-logo.png"
              alt="Acebook Logo"
              className="mx-auto"
            />
          </div>
          <div className="w-full max-w-md space-y-4">
            {children}
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 hidden md:block">
          <img
            src="/images/acebuilding.png"
            alt="Building Image"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
}
