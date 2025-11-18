import localFont from 'next/font/local'

const iranYekanFont = localFont({
    src: [
        // Thin
        {
            path: "../../public/fonts/woff/iranyekanwebthinfanum.woff",
            weight: "100",
            style: "normal"
        },
        {
            path: "../../public/fonts/ttf/iranyekanwebthinfanum.ttf",
            weight: "100",
            style: "normal"
        },
        // Light
        {
            path: "../../public/fonts/woff/iranyekanweblightfanum.woff",
            weight: "300",
            style: "normal"
        },
        {
            path: "../../public/fonts/ttf/iranyekanweblightfanum.ttf",
            weight: "300",
            style: "normal"
        },
        // Regular
        {
            path: "../../public/fonts/woff/iranyekanwebregularfanum.woff",
            weight: "400",
            style: "normal"
        },
        {
            path: "../../public/fonts/ttf/iranyekanwebregularfanum.ttf",
            weight: "400",
            style: "normal"
        },
        // Medium
        {
            path: "../../public/fonts/woff/iranyekanwebmediumfanum.woff",
            weight: "500",
            style: "normal"
        },
        {
            path: "../../public/fonts/ttf/iranyekanwebmediumfanum.ttf",
            weight: "500",
            style: "normal"
        },
        // Bold
        {
            path: "../../public/fonts/woff/iranyekanwebboldfanum.woff",
            weight: "700",
            style: "normal"
        },
        {
            path: "../../public/fonts/ttf/iranyekanwebboldfanum.ttf",
            weight: "700",
            style: "normal"
        },
        // ExtraBold
        {
            path: "../../public/fonts/woff/iranyekanwebextraboldfanum.woff",
            weight: "800",
            style: "normal"
        },
        {
            path: "../../public/fonts/ttf/iranyekanwebextraboldfanum.ttf",
            weight: "800",
            style: "normal"
        },
        //Black
        {
            path: "../../public/fonts/woff/iranyekanwebblackfanum.woff",
            weight: "900",
            style: "normal"
        },
        {
            path: "../../public/fonts/ttf/iranyekanwebblackfanum.ttf",
            weight: "900",
            style: "normal"
        }
    ],
    variable: "--font-iranYekanFont",
    style: "normal",
    display: "block",
})

export default iranYekanFont;
