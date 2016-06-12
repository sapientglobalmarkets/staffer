export default function formatDate(dt) {
    const m = dt.getMonth() + 1;
    const d = dt.getDate();
    return `${dt.getFullYear()}-${pad(m)}-${pad(d)}`;
}

function pad(value) {
    return value < 10 ? ('0' + value) : value;
}

