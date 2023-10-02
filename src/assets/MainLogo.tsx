import * as React from "react"

interface IProps {
  wireFrameColor: string;
  cornerColor: string;
  accentColor: string;
}


export default function MainLogo(props: IProps){
  const { wireFrameColor, cornerColor, accentColor } = props;


  return  (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    className="icon"
    viewBox="0 0 1024 1024"
  >
    <path
      fill={wireFrameColor}
      d="m625.6 516.8 19.2 81.6 104-38.4 4.8 14.4-110.4 40L560 824l-14.4-6.4 83.2-203.2-169.6-25.6 64 217.6c3.2 8-1.6 17.6-11.2 19.2s-17.6-1.6-19.2-11.2l-68.8-232L270.4 560l1.6-16 145.6 22.4-28.8-96L272 529.6l-14.4-28.8 129.6-65.6L480 217.6 254.4 499.2l-12.8-9.6L480 190.4l9.6 6.4 27.2 11.2-96 227.2 177.6 41.6-64-268.8 16-3.2 67.2 278.4 136 32c8 1.6 14.4 11.2 11.2 19.2-1.6 8-11.2 14.4-19.2 11.2l-120-28.8zM608 512l-185.6-43.2 30.4 102.4 176 25.6L608 512zm-46.4-313.6 12.8-9.6 209.6 296-12.8 9.6-209.6-296zM768 588.8l12.8 9.6-201.6 240-12.8-9.6 201.6-240zm-278.4 240L478.4 840l-232-243.2 11.2-11.2 232 243.2z"
    />
    <path
      fill={cornerColor}
      d="M336 448a64 64 0 1 0 128 0 64 64 0 1 0-128 0ZM584 608a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z"
    />
    <path
      fill={accentColor}
      d="M208 624c-44.8 0-80-35.2-80-80s35.2-80 80-80 80 35.2 80 80-35.2 80-80 80zm0-32c27.2 0 48-20.8 48-48s-20.8-48-48-48-48 20.8-48 48 20.8 48 48 48zm320 368c-44.8 0-80-35.2-80-80s35.2-80 80-80 80 35.2 80 80-35.2 80-80 80zm0-32c27.2 0 48-20.8 48-48s-20.8-48-48-48-48 20.8-48 48 20.8 48 48 48zm0-704c-44.8 0-80-35.2-80-80s35.2-80 80-80 80 35.2 80 80-35.2 80-80 80zm0-32c27.2 0 48-20.8 48-48s-20.8-48-48-48-48 20.8-48 48 20.8 48 48 48zm288 432c-44.8 0-80-35.2-80-80s35.2-80 80-80 80 35.2 80 80-35.2 80-80 80zm0-32c27.2 0 48-20.8 48-48s-20.8-48-48-48-48 20.8-48 48 20.8 48 48 48z"
    />
  </svg>
)
}
