export function generateCode(): string {
    const letters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers: number = Math.floor(1000 + Math.random() * 9000);

    let id: string = `${letters[Math.floor(Math.random() * 10)]}${letters[Math.floor(Math.random() * 10)]}${numbers}`;

    return id;
}

export function imageIsValid(type: string) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return validTypes.some((val) => val === type);
}
