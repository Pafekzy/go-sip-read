
interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 gosip-gradient-text">
        {title}
      </h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
}
