const fetchCount = async (amount = 1) => {
    return new Promise(async (resolve) => {
        setTimeout(async () => {
            resolve({ data: amount });
        }, 500);
        
        try {
            const response = await fetch('https://api.example.com/data');
            const data = await response.json();
            resolve(data);
        } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error);
            resolve({ error: 'Error fetching data' });
        }
    });
};

export { fetchCount };  