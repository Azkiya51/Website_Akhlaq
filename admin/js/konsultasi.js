function bukaBalasan(button){

    const row = button.closest("tr");

    const nama =
        row.cells[1].innerText;

    const email =
        row.cells[2].innerText;

    const kategori =
        row.cells[3].innerText;

    document.getElementById("balasNama").value =
        nama;

    document.getElementById("balasEmail").value =
        email;

    document.getElementById("balasKategori").value =
        kategori;

    const modal =
        new bootstrap.Modal(
            document.getElementById("balasModal")
        );

    modal.show();
}

function kirimBalasan(){

    const nama =
        document.getElementById("balasNama").value;

    const balasan =
        document.getElementById("balasan").value;

    alert(
        `Balasan untuk ${nama} berhasil dikirim`
    );

}