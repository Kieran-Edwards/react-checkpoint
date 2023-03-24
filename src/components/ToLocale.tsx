const ToLocale = (props: number) => {
    return props.toLocaleString("en-GB", {
        style: "currency",
        currency: "GBP",
    });
};

export default ToLocale;
