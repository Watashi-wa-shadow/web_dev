import { useState } from "react";
import './transaction.css'
export function Transcation({cashflow,setCashflow}){
    const [category, setCategory] = useState("all");
    const categories = ["food", "rent", "travel", "salary", "shopping", "utilities", "entertainment"];
    const [query, setQuery] = useState("");
    const filtered = cashflow
  .filter((item) => category === "all" || item.category === category)
  .filter((item) =>
    item.description.toLowerCase().includes(query.toLowerCase())
  );
    const handleDelete = (id) =>{
        setCashflow((prev) => prev.filter((item) => item.id !== id));
    }
    const [editingId, setEditingId] = useState(null);
    const [draft, setDraft] = useState(null);

    const handleEdit = (item) => {
    setEditingId(item.id);
    setDraft({ ...item }); // copy, so the original stays unchanged until save
    };

    const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
    setCashflow((prev) =>
    prev.map((t) =>
        t.id === draft.id ? { ...draft, amount: Number(draft.amount) } : t
    )
    );
    setEditingId(null);
    setDraft(null);
    };

    const handleCancel = () => {
    setEditingId(null);
    setDraft(null);
    };
    const emptyEntry = { date: "", description: "", category: "food", amount: "" };
    const [showForm, setShowForm] = useState(false);
    const [newEntry, setNewEntry] = useState(emptyEntry);

    const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
    };

    const handleAdd = () => {
    if (!newEntry.date || !newEntry.description.trim() || newEntry.amount === "") return;

    setCashflow((prev) => [
        ...prev,
        { ...newEntry, id: Date.now(), amount: Number(newEntry.amount) },
    ]);
    setNewEntry(emptyEntry);
    setShowForm(false);
    };
    return(
        <>
            <div className="header">
                <div className="h2">
                    Transaction Table 
                </div>
                <search >
                    <input 
                        className="search"
                        type="search" 
                        placeholder="Search Transaction" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </search>
                <select className ="choice" 
                    value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="all">All</option>
                    {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                <button className="add-btn" onClick={() => setShowForm((s) => !s)}>
                    {showForm ? "Close" : "+ Add"}
                </button>
            </div>
            {showForm && (
            <div className="row">
                <input type="date" name="date" value={newEntry.date} onChange={handleNewChange} />
                <input name="description" placeholder="Description" value={newEntry.description} onChange={handleNewChange} />
                <select name="category" value={newEntry.category} onChange={handleNewChange}>
                {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
                </select>
                <input type="number" name="amount" placeholder="Amount" value={newEntry.amount} onChange={handleNewChange} />
                <button className="icon-btn" onClick={handleAdd}>Add</button>
            </div>
            )}
            <div className="main-body">
                    <div className="date">
                        Date
                    </div>
                    <div className="description">
                        Description
                    </div>
                    <div className="category">
                        Category
                    </div>
                    <div className="amount-used">
                        Amount
                    </div>
            </div>
            <div className="display">
                    {filtered.map((item) => 
                     item.id === editingId ? (
                        <div key={item.id} className="row">
                        <input type="date" name="date" value={draft.date} onChange={handleChange} />
                        <input name="description" value={draft.description} onChange={handleChange} />
                        <select name="category" value={draft.category} onChange={handleChange}>
                            {categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <input type="number" name="amount" value={draft.amount} onChange={handleChange} />
                        <button className="icon-btn" onClick={handleSave}>Save</button>
                        <button className="icon-btn" onClick={handleCancel}>Cancel</button>
                        </div>
                    ) :
                    (
                    <div className="row"
                        key={item.id} >
                        <span className="date">{item.date}</span>
                        <span className="description"> {item.description}</span>
                        <span className="category">{item.category}</span>
                        <span className="amount-used">{item.amount}</span>
                        <button
                            className="icon-btn"
                            onClick={() => handleEdit(item)}
                        >
                            ✏️
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                            🗑️
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}