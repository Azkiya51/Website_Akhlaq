function tambahKonselor() {

    const nama =
        document.getElementById("namaKonselor").value;

    const email =
        document.getElementById("emailKonselor").value;

    const spesialisasi =
        document.getElementById("spesialisasi").value;

    const status =
        document.getElementById("statusKonselor").value;

    const tbody =
        document.getElementById("konselorBody");

    const nomor =
        tbody.rows.length + 1;

    const badge =
        status === "Aktif"
            ? "bg-success"
            : "bg-secondary";

    tbody.innerHTML += `
        <tr>
            <td>${nomor}</td>

            <td>
                <img src="https://i.pravatar.cc/40?u=${email}"
                     class="rounded-circle">
            </td>

            <td>${nama}</td>

            <td>${email}</td>

            <td>${spesialisasi}</td>

            <td>
                <span class="badge ${badge}">
                    ${status}
                </span>
            </td>

            <td>
                <button class="btn btn-warning btn-sm">
                    Edit
                </button>

                <button class="btn btn-danger btn-sm">
                    Hapus
                </button>
            </td>
        </tr>
    `;
}