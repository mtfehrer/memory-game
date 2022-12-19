"use client";

export default function ClearLocalStorageButton() {
    function clearStorage() {
        localStorage.clear();
    }

    return <button onClick={clearStorage}>Clear Local Storage</button>;
}
