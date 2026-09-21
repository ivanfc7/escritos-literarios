export function getReadingTime(text: string): string {
    const wordsPerMinute = 200;
    const numberOfWords = text.split(/\s+/g).length;
    const minutes = Math.ceil(numberOfWords / wordsPerMinute);
    
    return `${minutes} min de lectura`;
}