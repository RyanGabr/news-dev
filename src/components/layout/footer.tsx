import Logo from "@/assets/logo.svg";

export function Footer() {
  return (
    <div className="w-full py-14 px-6 md:px-0 border-t">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={Logo} alt="Logo" className="w-7 dark:invert" />

          <p className="font-medium text-muted-foreground text-sm">
            © 2026 lumi.com
          </p>
        </div>

        <div>
          <p className="font-medium text-muted-foreground text-sm">
            Created by RyanGabr
          </p>
        </div>
      </div>
    </div>
  );
}
