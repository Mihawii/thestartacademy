import React, { useEffect, useMemo, useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { MoveRight, Sticker } from "lucide-react";
import { Button } from "./button";

const titles = ["amazing", "new", "wonderful", "beautiful", "smart"];

const Hero: React.FC = () => {
  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, callback: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      callback();
    }
  };

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button
              variant="secondary"
              size="sm"
              className="gap-4"
              aria-label="Read our launch article"
              tabIndex={0}
              onClick={() => window.open('#', '_blank')}
              onKeyDown={(e) => handleKeyDown(e, () => window.open('#', '_blank'))}
            >
              Read our launch article <MoveRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">This is something</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <span
                    key={index}
                    className="absolute font-semibold"
                  >
                    {title}
                  </span>
                ))}
              </span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Best student career accelerator program in Central Asia.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              size="lg"
              className="gap-4 w-full sm:w-auto transition-transform duration-200 hover:scale-105 active:scale-95"
              variant="default"
              aria-label="About us"
              tabIndex={0}
              onClick={() => window.open('#about', '_self')}
              onKeyDown={(e) => handleKeyDown(e, () => window.open('#about', '_self'))}
            >
              <Sticker className="w-4 h-4" aria-hidden="true" /> About us
            </Button>
            <Button
              size="lg"
              className="gap-4 transition-transform duration-200 hover:scale-105 active:scale-95 hover:bg-spektr-blue-50 hover:text-spektr-white"
              variant="secondary"
              aria-label="Sign up here"
              tabIndex={0}
              onClick={() => window.open('#signup', '_self')}
              onKeyDown={(e) => handleKeyDown(e, () => window.open('#signup', '_self'))}
            >
              Sign up here <MoveRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Hero }; 