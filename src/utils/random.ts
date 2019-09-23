export namespace Random {

    export namespace INT {
        /**
         * return value between min and max
         * @param min value (inclusive)
         * @param max value (exclusive)
         */
        export function range(min: number, max: number): number {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        /**
         * return value between 0 and value
         * @param value max value (exclusive)
         */
        export function max(value: number): number{
            return Math.floor(Math.random() * value);
        }
    }

    export namespace FLOAT {
        /**
         * return value between min and max
         * @param min value (inclusive)
         * @param max value (exclusive)
         */
        export function range(min: number, max: number): number {
            return Math.random() * (max - min) + min;
        }

        /**
         * return value between 0 and value
         * @param value  max value (exclusive)
         */
        export function max(value: number): number{
            return Math.random() * value;
        }
    }

}