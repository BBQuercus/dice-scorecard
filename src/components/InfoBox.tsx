import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

interface InfoBoxProps {
  title: string;
  content: string;
  example?: React.ReactNode;
}

export function InfoBox({ title, content, example }: InfoBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="p-0 h-auto">
          <Info className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">{content}</p>
        {example && (
          <p className="text-sm text-muted-foreground flex flex-row gap-2 items-center">
            e.g. {example}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
