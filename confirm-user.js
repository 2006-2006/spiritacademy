
import pg from 'pg';
const { Client } = pg;

// Direct connection string (bypassing pooler for admin tasks)
// Host: db.[project-ref].supabase.co
// User: postgres
// Pass: sasikala@2006 (URL encoded as sasikala%402006)
// DB: postgres
const connectionString = 'postgresql://postgres:sasikala%402006@db.nhihdtnmaofeorfgcnaw.supabase.co:5432/postgres';

const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

async function main() {
    try {
        console.log('Connecting to PostgreSQL (Direct)...');
        await client.connect();
        console.log('Connected successfully.');

        // Find the user by email
        const email = 'yvijayakumar2006@gmail.com';
        const query = 'SELECT id, email, confirmed_at FROM auth.users WHERE email = $1';
        console.log(`Searching for user: ${email}`);
        const res = await client.query(query, [email]);

        if (res.rows.length === 0) {
            console.log('User not found.');
        } else {
            const user = res.rows[0];
            console.log('User found:', user);
            if (!user.confirmed_at) {
                // Confirm the user
                console.log('Confirming user...');
                const updateQuery = 'UPDATE auth.users SET confirmed_at = NOW() WHERE id = $1 RETURNING confirmed_at';
                const updateRes = await client.query(updateQuery, [user.id]);
                console.log('User confirmed manually:', updateRes.rows[0]);
            } else {
                console.log('User is already confirmed at:', user.confirmed_at);
            }
        }
    } catch (err) {
        console.error('Error connecting or querying database:', err);
    } finally {
        await client.end();
    }
}

main();
