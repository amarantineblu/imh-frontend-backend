import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
  const {
    alt = 'Ibiyeomie Meat house',
    width = 150,
    height = 50,
    className = 'h-10 w-auto',
    ...rest
  } = props as React.ImgHTMLAttributes<HTMLImageElement>;

  return <img src="/img/ibmh.svg" alt={alt} width={width} height={height} className={className} {...rest} />;
}
