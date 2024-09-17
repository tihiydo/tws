import {Provider} from "react-redux";
import store from "@/store";
import {createTheme, ThemeProvider} from "@mui/material";
import Script from "next/script";
import {NextIntlClientProvider} from "next-intl";
// import AnalyticsInit from "@/components/client/shared/Analytics/AnalyticsInit";

const Providers = ({children}) => {
    const theme = createTheme({
            typography: {
                fontFamily: 'Montserrat, sans-serif',
            },
            palette: {
                secondary: {
                    main: '#09810a',
                },
                primary: {
                    main: '#323232'
                }
            },
        },
    );

    return (
        <>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </Provider>
        </>
    );
};

export default Providers;