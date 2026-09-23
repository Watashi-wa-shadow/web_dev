import './goals.css';
import { useState } from 'react';
import { useGoals } from './storage';

const emptyGoal = { name: "", date: "", price: "", budget: "" };

function todayString() {
  return new Date().toLocaleDateString("en-CA");
}

function getStatus(goal) {
  if (!goal) return "pending";
  if (goal.completed) return "done";
  if (!goal.date) return "pending";
  return goal.date < todayString() ? "missed" : "pending";
}

export function Goals() {
  const goalHook = useGoals();
  const goals = goalHook?.goals || [];
  const addGoal = goalHook?.addGoal;
  const updateGoal = goalHook?.updateGoal;
  const removeGoal = goalHook?.removeGoal;

  const [showForm, setShowForm] = useState(false);
  const [newGoal, setNewGoal] = useState(emptyGoal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGoal((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!newGoal.name.trim() || !newGoal.date || newGoal.price === "" || newGoal.budget === "") return;
    if (addGoal) {
      addGoal({
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        name: newGoal.name.trim(),
        date: newGoal.date,
        price: Number(newGoal.price),
        budget: Number(newGoal.budget),
        completed: false,
      });
    }
    setNewGoal(emptyGoal);
    setShowForm(false);
  };
    const [editingId, setEditingId] = useState(null);
    const [draft, setDraft] = useState(null);

    const handleEdit = (item) => {
    setEditingId(item.id);
    setDraft({ ...item }); // copy, so the original stays unchanged until save
  };

  const handleSave = () => {
    updateGoal(draft.id, {
      name: draft.name,
      date: draft.date,
      price: Number(draft.price),
      budget: Number(draft.budget),
    });
    setEditingId(null);
    setDraft(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setDraft(null);
  };
  return (
    <>
      <div className="header">
        <div className="h2">Goals</div>
        <button className="add-btn" onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Close" : "+ Add"}
        </button>
      </div>

      {showForm && (
        <div className="row">
          <input name="name" placeholder="Name" value={newGoal.name} onChange={handleChange} />
          <input type="date" name="date" value={newGoal.date} onChange={handleChange} />
          <input type="number" name="price" placeholder="Price" value={newGoal.price} onChange={handleChange} />
          <input type="number" name="budget" placeholder="Budget" value={newGoal.budget} onChange={handleChange} />
          <button className="icon-btn" onClick={handleAdd}>Add</button>
        </div>
      )}

      <div className="main-body">
        <div>Done</div>
        <div>Name</div>
        <div>Buy by</div>
        <div>Price</div>
        <div>Budget</div>
        <div></div>
      </div>

      {goals.length === 0 ? (
        <div className="empty">Nothing to show</div>
      ) : (
        goals.map((g, index) => {
          const status = getStatus(g);
          const key = g.id ?? index;
          const isEditing = editingId === g.id;
          return (
            <div className="main-body" key={key}>
              <div>
                {status === "missed" ? (
                  <span title="Not completed before the date">x</span>
                ) : (
                  <input
                    type="checkbox"
                    checked={Boolean(g.completed)}
                    onChange={(e) => updateGoal && updateGoal(g.id, { completed: e.target.checked })}
                  />
                )}
              </div>
               {isEditing ? (
        <>
          <div>
            <input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
          </div>
          <div>
            <input
              type="date"
              value={draft.date}
              onChange={(e) => setDraft({ ...draft, date: e.target.value })}
            />
          </div>
          <div>
            <input
              type="number"
              value={draft.price}
              onChange={(e) => setDraft({ ...draft, price: e.target.value })}
            />
          </div>
          <div>
            <input
              type="number"
              value={draft.budget}
              onChange={(e) => setDraft({ ...draft, budget: e.target.value })}
            />
          </div>
        </>
      ) : (
        <>
          <div style={g.completed ? { textDecoration: "line-through" } : undefined}>
            {g.name}
          </div>
          <div>{g.date}</div>
          <div>{g.price}</div>
          <div>{g.budget}</div>
        </>
      )}

      <div>
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button className="edit-btn" onClick={() => handleEdit(g)}>✏️</button>
        )}
      </div>

        <div>
            <button onClick={() => removeGoal && removeGoal(g.id)}>Delete</button>
          </div>
        </div>
      );
      })
         
      )}
    </>
  );
}