// custom-waline-model-static.js

/**
 * IMPLEMENTASI WALINE CUSTOM USER MODEL
 * (Tanpa koneksi ke database eksternal)
 */
function model(modelName) {
    if (modelName !== 'Users') {
        return;
    }

    // Daftar statis (hardcoded) user dan label kustom Anda
    const STATIC_USER_LABELS = {
        'admin_123': 'Pemilik Situs',
        'dev_456': 'Developer',
        'user_789': 'Komentator VIP',
    };

    return {
        /**
         * Metode SELECT: Mengambil data label berdasarkan objectId (ID User Waline)
         * * @param {Object} where - Filter dari Waline (biasanya { objectId: ['IN', [ids...]] })
         */
        select: async (where) => {
            const userIds = where.objectId && where.objectId[0] === 'IN' ? where.objectId[1] : [];
            
            if (userIds.length === 0) {
                return [];
            }
            
            const formattedUsers = userIds
                // Filter hanya user yang memiliki ID di daftar statis
                .filter(id => STATIC_USER_LABELS[id]) 
                .map(id => {
                    return {
                        // WAJIB: objectId harus diisi dengan ID User Waline
                        objectId: id,
                        
                        // WAJIB: Field 'label' diisi dari daftar statis
                        label: STATIC_USER_LABELS[id], 
                        
                        // OPSIONAL: Field lain yang ingin ditimpa (misalnya avatar kustom)
                        // avatar: id === 'admin_123' ? 'https://example.com/admin.png' : undefined,
                    };
                });

            return formattedUsers;
        },
        
        // Metode lain dipertahankan sebagai fungsi kosong/dummy
        add: () => ({}),
        update: () => ({}),
        delete: () => {},
        count: () => 0,
    };
}

// Ekspor model ini untuk disuntikkan ke Waline Server
module.exports = { model };
