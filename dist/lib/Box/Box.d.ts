declare const Box: import("@stitches/react").IStyledComponent<"div", {}, {
    tokens: {
        colors: {
            $hiContrast: string;
            $loContrast: string;
            $canvas: string;
            $gray100: string;
            $gray200: string;
            $gray300: string;
            $gray400: string;
            $gray500: string;
            $gray600: string;
            $blue100: string;
            $blue200: string;
            $blue300: string;
            $blue400: string;
            $blue500: string;
            $blue600: string;
            $purple100: string;
            $purple200: string;
            $purple300: string;
            $purple400: string;
            $purple500: string;
            $purple600: string;
            $green100: string;
            $green200: string;
            $green300: string;
            $green400: string;
            $green500: string;
            $green600: string;
            $red100: string;
            $red200: string;
            $red300: string;
            $red400: string;
            $red500: string;
            $red600: string;
            $yellow100: string;
            $yellow200: string;
            $yellow300: string;
            $yellow400: string;
            $yellow500: string;
            $yellow600: string;
        };
        fonts: {
            $default: string;
            $mono: string;
        };
        space: {
            $0: string;
            $1: string;
            $2: string;
            $3: string;
            $4: string;
            $5: string;
            $6: string;
            $8: string;
            $10: string;
            $12: string;
            $16: string;
            $20: string;
            $24: string;
            $32: string;
            $40: string;
            $48: string;
            $56: string;
            $64: string;
        };
        sizes: {
            $0: string;
            $1: string;
            $2: string;
            $3: string;
            $4: string;
            $5: string;
            $6: string;
            $8: string;
            $10: string;
            $12: string;
            $16: string;
            $20: string;
            $24: string;
            $32: string;
            $40: string;
            $48: string;
            $56: string;
            $64: string;
        };
        fontSizes: {
            $xs: string;
            $sm: string;
            $base: string;
            $lg: string;
            $xl: string;
            $2xl: string;
            $3xl: string;
            $4xl: string;
            $5xl: string;
            $6xl: string;
        };
        lineHeights: {
            $xs: string;
            $sm: string;
            $base: string;
            $lg: string;
            $xl: string;
            $2xl: string;
            $3xl: string;
            $4xl: string;
            $5xl: string;
            $6xl: string;
        };
        radii: {
            $0: string;
            $sm: string;
            $md: string;
            $lg: string;
            $xl: string;
            $round: string;
            $pill: string;
        };
        zIndices: {
            $1: string;
            $2: string;
            $3: string;
            $4: string;
            $max: string;
        };
    };
    breakpoints: {
        tablet: (rule: string) => string;
        laptop: (rule: string) => string;
        desktop: (rule: string) => string;
        screen: (rule: string) => string;
    };
    utils: {
        p: () => (value: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64") => {
            paddingTop: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
            paddingBottom: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
            paddingLeft: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
            paddingRight: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
        };
        pt: () => (value: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64") => {
            paddingTop: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
        };
        pr: () => (value: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64") => {
            paddingRight: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
        };
        pb: () => (value: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64") => {
            paddingBottom: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
        };
        pl: () => (value: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64") => {
            paddingLeft: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
        };
        px: () => (value: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64") => {
            paddingLeft: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
            paddingRight: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
        };
        py: () => (value: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64") => {
            paddingTop: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
            paddingBottom: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
        };
        m: () => (value: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64") => {
            marginTop: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
            marginBottom: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
            marginLeft: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
            marginRight: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
        };
        mt: () => (value: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64") => {
            marginTop: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
        };
        mr: () => (value: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64") => {
            marginRight: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
        };
        mb: () => (value: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64") => {
            marginBottom: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
        };
        ml: () => (value: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64") => {
            marginLeft: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
        };
        mx: () => (value: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64") => {
            marginLeft: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
            marginRight: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
        };
        my: () => (value: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64") => {
            marginTop: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
            marginBottom: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
        };
        bc: () => (value: (string & {}) | "$hiContrast" | "$loContrast" | "$canvas" | "$gray100" | "$gray200" | "$gray300" | "$gray400" | "$gray500" | "$gray600" | "$blue100" | "$blue200" | "$blue300" | "$blue400" | "$blue500" | "$blue600" | "$purple100" | "$purple200" | "$purple300" | "$purple400" | "$purple500" | "$purple600" | "$green100" | "$green200" | "$green300" | "$green400" | "$green500" | "$green600" | "$red100" | "$red200" | "$red300" | "$red400" | "$red500" | "$red600" | "$yellow100" | "$yellow200" | "$yellow300" | "$yellow400" | "$yellow500" | "$yellow600") => {
            backgroundColor: (string & {}) | "$hiContrast" | "$loContrast" | "$canvas" | "$gray100" | "$gray200" | "$gray300" | "$gray400" | "$gray500" | "$gray600" | "$blue100" | "$blue200" | "$blue300" | "$blue400" | "$blue500" | "$blue600" | "$purple100" | "$purple200" | "$purple300" | "$purple400" | "$purple500" | "$purple600" | "$green100" | "$green200" | "$green300" | "$green400" | "$green500" | "$green600" | "$red100" | "$red200" | "$red300" | "$red400" | "$red500" | "$red600" | "$yellow100" | "$yellow200" | "$yellow300" | "$yellow400" | "$yellow500" | "$yellow600";
        };
        br: () => (value: (string & {}) | "$0" | "$sm" | "$md" | "$lg" | "$xl" | "$round" | "$pill") => {
            borderRadius: (string & {}) | "$0" | "$sm" | "$md" | "$lg" | "$xl" | "$round" | "$pill";
        };
        font: () => (value: "$sm" | "$lg" | "$xl" | "$xs" | "$base" | "$2xl" | "$3xl" | "$4xl" | "$5xl" | "$6xl") => {
            fontSize: "$sm" | "$lg" | "$xl" | "$xs" | "$base" | "$2xl" | "$3xl" | "$4xl" | "$5xl" | "$6xl";
            lineHeight: string;
        };
        size: () => (value: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64") => {
            width: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
            height: (string & {}) | "$0" | "$1" | "$2" | "$3" | "$4" | "$5" | "$6" | "$8" | "$10" | "$12" | "$16" | "$20" | "$24" | "$32" | "$40" | "$48" | "$56" | "$64";
        };
    };
}>;
export default Box;
