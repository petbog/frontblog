// import { Theme } from "../Context/ThemeContext"



export const ChangeCssRootVareibals = (theme: string) => {
    console.log('ChangeCssRootVareibals',theme)
    const component = ['--body-background', '--cart-border', '--cart-text-color', '--cart-background', '--sort-rating', '--sort-rating-border-activ',
        '--sort-rating-color-activ', '--sort-rating-color-hech', '--eye-lent', '--commentImg-lent', '--header-gradient', '--header-background', '--add-post-button-border',
        '--add-post-button-background', '--post-text-collor', '--post-webkit-box-shadow', '--post-moz-box-shadow', '--post-box-shadow']

    component.forEach((element) => {
        const root = document.querySelector(':root') as HTMLElement
        root.style.setProperty(`${element}-default`, `var(${element}-${theme}`)
    })

}