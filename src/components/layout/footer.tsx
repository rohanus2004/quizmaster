export function Footer() {
  return (
    <footer className="w-full bg-card border-t mt-auto">
      <div className="container mx-auto flex items-center justify-center p-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} QuizWhiz. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
