import { ReactNode } from "react";

type AdminPageHeaderProps = {
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
};

export default function AdminPageHeader({
  title,
  subtitle,
  trailing,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        {subtitle ? (
          <p className="text-gray-400 mt-2 max-w-3xl">{subtitle}</p>
        ) : null}
      </div>
      {trailing ? <div className="min-w-[180px]">{trailing}</div> : null}
    </div>
  );
}
