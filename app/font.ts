import { Fredoka, Nunito, Nunito_Sans } from 'next/font/google'

// 展示/品牌标题：圆润可爱，儿童电商常见标题字体
export const display = Fredoka({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-display',
    display: 'swap',
})

// 区块标题：友好圆角无衬线
export const header = Nunito({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-header',
    display: 'swap',
})

// 正文/UI：清晰易读的圆角无衬线
export const body = Nunito_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-body',
    display: 'swap',
})
