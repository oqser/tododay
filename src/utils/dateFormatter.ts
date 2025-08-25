export const formatDate = (dateString: string, format: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    switch (format) {
        case "DD.MM":
            return date.toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
            });
        case "DD.MM.YYYY":
            return date.toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        case "DD.month":
            return date.toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
            });
        default:
            return date.toLocaleDateString("ru-RU");
    }
};
