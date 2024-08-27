export class WebComponentsPropsParserHelper {
    static parseArray = (value: string | null): string[] => {
        if (!value) {
            return [];
        }
        return value.split(',');
    }

    static parseNumber = (value: string | null): number | null => {
        return value ? parseInt(value, 10) : null;
    }

    static parseBoolean = (value: string | null): boolean => {
        return value === 'true';
    }

    static parseString = (value: string | null): string | null => {
        return value;
    }
}