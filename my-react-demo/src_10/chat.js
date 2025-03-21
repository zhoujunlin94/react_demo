export function createConnection() {
    return {
        connect() {
            console.log('✅ 连接中……');
        },
        disconnect() {
            console.log('❌ 连接断开。');
        }
    }
}