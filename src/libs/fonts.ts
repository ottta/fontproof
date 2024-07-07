import localFont from "next/font/local";

// export const fontOptima = localFont({
//   display: "block",
//   variable: "--font-optima",
//   src: [
//     {
//       path: "../../public/fonts/optima-nova/OptimaNovaLTProRegular.otf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/optima-nova/OptimaNovaLTProItalic.otf",
//       weight: "400",
//       style: "italic",
//     },
//     {
//       path: "../../public/fonts/optima-nova/OptimaNovaLTProBold.otf",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/optima-nova/OptimaNovaLTProBoldItalic.otf",
//       weight: "700",
//       style: "italic",
//     },
//   ],
// });

export const fontGeorgia = localFont({
  display: "block",
  variable: "--font-georgia",
  src: [
    {
      path: "../../public/fonts/georgia/Georgia.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/georgia/GeorgiaItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/georgia/GeorgiaBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/georgia/GeorgiaBoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
});

// export const fontHelvetica = localFont({
//   display: "block",
//   variable: "--font-helvetica",
//   src: [
//     {
//       path: "../../public/fonts/helvetica-now/HelveticaNowVar.ttf",
//       weight: "50 1000",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/helvetica-now/HelveticaNowVar-Italic.ttf",
//       weight: "50 1000",
//       style: "italic",
//     },
//   ],
// });
