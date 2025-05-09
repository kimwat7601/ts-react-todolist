class MyStorage {
    #appName: string;
    #data: Record<string, unknown>;
    #storage: Storage = localStorage;
    
    constructor(appName: string) {
        this.#appName = appName;
        try {
            const storedData = this.#storage.getItem(this.#appName);
            this.#data = storedData ? JSON.parse(storedData) : {};
        } catch(e) {
            console.log('ストレージの読み込みに失敗しました：', e);
            this.#data = {};
        }
    }

    getItem<T> (key: string): T | null {
        return (this.#data[key] as T) || null;
    }

    setItem(key: string, value: unknown): void {
        this.#data[key] = value;
    }

    save(): void {
        try {
            this.#storage.setItem(this.#appName, JSON.stringify(this.#data)); 
        } catch (e) {
            console.log('ストレージの保存に失敗しました：', e);
        }
    }

};

export default MyStorage;