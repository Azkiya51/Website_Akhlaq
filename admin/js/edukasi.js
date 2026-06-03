function tambahEdukasi() {

    const judul =
        document.getElementById("judul").value;

    const kategori =
        document.getElementById("kategori").value;

    const status =
        document.getElementById("status").value;

    const table =
        document.getElementById("edukasiBody");

    const rowCount =
        table.rows.length + 1;

    const today =
        new Date().toLocaleDateString('id-ID');

    table.innerHTML += `
        <tr>
            <td>${rowCount}</td>
            <td>${judul}</td>
            <td>${kategori}</td>
            <td>${today}</td>
            <td>
                <span class="badge bg-success">
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