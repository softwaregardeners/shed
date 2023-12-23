const constTrue = () => true as const
export { constTrue as true }

const constFalse = () => false as const
export { constFalse as false }

const constUndefined = () => undefined
export { constUndefined as undefined }

const constVoid = () => void undefined
export { constVoid as void }

export const value =
    <T>(value: T) =>
    () =>
        value
