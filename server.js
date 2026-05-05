const app = express();
const db = new sqlite3.Database('database.sqlite');

// Middleware
app.use(cors());
app.use(express.json());

// Database Initialization
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)");
});

// Port configuration
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});