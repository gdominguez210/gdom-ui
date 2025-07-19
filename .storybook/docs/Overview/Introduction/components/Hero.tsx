import { Canvas, type CanvasProps } from '@/.storybook/components/Canvas/Canvas';
import { Button } from '@/lib/Button/Button';
import { IconLibrary } from '@/lib/IconLibrary/IconLibrary';
import { cn } from '@/utils/cn';

export function Hero(props: CanvasProps) {
  const { className, ...restProps } = props;

  return (
    <section
      className={cn(
        'sb-unstyled relative z-0 before:absolute before:top-0 before:bottom-0 before:left-1/2 before:block before:w-screen before:-translate-x-1/2 before:transform before:bg-radial-[at_50%_40%] before:from-blue-800 before:to-blue-900',
        className,
      )}
    >
      <Canvas
        as="div"
        className="relative z-1 my-0"
        {...restProps}
      >
        <div className="z-1 flex items-center font-[Nunito_Sans]">
          <div className="flex flex-col gap-7 @min-[712px]/introduction:basis-2/3">
            <h1 className="flex flex-col text-[28px] font-bold text-balance @min-[610px]/introduction:text-[32px]">
              <span className="text-balance text-blue-500">Create Stunning Audio Experiences</span>
              <span className="text-balance">With The GDOM-UI Component Library</span>
            </h1>
            <p className="text-lg text-balance text-gray-500 @min-[610px]/introduction:text-lg">
              Transform your web apps with modern, accessible, and customizable audio components -
              designed for performance, flexibility, and beautiful audio visualization.
            </p>
            <div className="flex flex-col gap-4 @min-[480px]/introduction:flex-row">
              <Button
                as="a"
                href="./?path=/docs/overview-getting-started--docs"
                variant="primary"
                size="xxl"
              >
                Get Started <IconLibrary name="arrow-right-long-fill" />
              </Button>
              <Button
                as="a"
                href="./?path=/docs/overview-releases--docs"
                variant="secondary"
                size="xxl"
                className="text-blue-500"
              >
                See What's New
                <IconLibrary name="sparkling-2-fill" />
              </Button>
            </div>
          </div>
          <div className="hidden @min-[610px]/introduction:basis-1/3 @min-[610px]/introduction:items-center @min-[610px]/introduction:justify-center @min-[712px]/introduction:flex">
            <img
              src="logo-symbol.svg"
              alt="GDOM-UI Logo"
              className="h-42 w-42"
            />
          </div>
        </div>
      </Canvas>
    </section>
  );
}
