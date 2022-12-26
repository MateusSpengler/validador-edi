import * as React from "react";
import "./Home.css";
import "../javascript/HomeValidador";
import { useForm } from "react-hook-form";
import Lince from "../images/lince.png";
import Calendar from "../images/calendar.jpg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import { Button } from "@mui/material";

export default function Home() {
    const { register, handleSubmit } = useForm();

    const [fatura, setFatura] = React.useState(6);
    const [texto, setTexto] = React.useState(false);
    const [conhecimento, setConhecimento] = React.useState(6);
    const [documento, setDocumento] = React.useState();

    const onSubmit = async (data) => {

        const texto = data.documento.trim().split("\n");
        const tamanho = data.documento.trim().split("\n").length;

        var card_main_top = document.getElementById("main_card");
        card_main_top.innerText = "";

        if (texto[tamanho - 1].length >= 43 && texto[tamanho - 1].length <= 45) {

            var tamanhoData = 15 + fatura; //TAMANHO PADRAO DATA RESUMO

            // CARD TOP NOTAS #1

            var card_top_linha = document.createElement("div");
            card_top_linha.className = "main_card_top_linha";

            var main_card_top_linha_content = document.createElement("div");
            main_card_top_linha_content.className = "main_card_top_linha_content";

            var main_card_top_linha_content_title = document.createElement("span");
            main_card_top_linha_content_title.className = "main_card_top_linha_content_title";
            main_card_top_linha_content_title.innerHTML = tamanho - 1;

            var main_card_top_linha_content_subtitle = document.createElement("span");
            main_card_top_linha_content_subtitle.className = "main_card_top_linha_content_subtitle";
            main_card_top_linha_content_subtitle.innerHTML = "Notas"

            main_card_top_linha_content.appendChild(main_card_top_linha_content_title);
            main_card_top_linha_content.appendChild(main_card_top_linha_content_subtitle);
            card_top_linha.appendChild(main_card_top_linha_content);
            // card_top.appendChild(card_top_linha);
            card_main_top.appendChild(card_top_linha);

            // CARD TOP NOTAS #2

            var card_top_data = document.createElement("div");
            card_top_data.className = "main_card_top_data";

            var main_card_top_data_content = document.createElement("div");
            main_card_top_data_content.className = "main_card_top_data_content";

            var div = document.createElement("div");
            div.className = "main_card_top_linha_content_title";

            var img = document.createElement("img");
            img.className = "main_card_top_linha_content_title_img";
            img.src = Calendar;

            div.appendChild(img);

            var main_card_top_data_content_subtitle = document.createElement("span");
            main_card_top_data_content_subtitle.className = "main_card_top_data_content_subtitle";
            main_card_top_data_content_subtitle.innerHTML = texto[tamanho - 1].substring(tamanhoData, tamanhoData + 2) + "/" + texto[tamanho - 1].substring(tamanhoData + 2, tamanhoData + 4) + "/" + texto[tamanho - 1].substring(tamanhoData + 4, tamanhoData + 8);

            main_card_top_data_content.appendChild(div);
            main_card_top_data_content.appendChild(main_card_top_data_content_subtitle);
            card_top_data.appendChild(main_card_top_data_content);
            card_main_top.appendChild(card_top_data);


            // CARD TOP NOTAS #3

            var card_top_info = document.createElement("div");
            card_top_info.className = "main_card_top_info";

            var card_top_info_content = document.createElement("div");
            card_top_info_content.className = "main_card_top_info_content";

            var card_top_info_content_title = document.createElement("span");
            card_top_info_content_title.className = "main_card_top_info_content_title";
            card_top_info_content_title.innerHTML = "CNPJ: " + texto[tamanho - 1].substring(1, 15);
            card_top_info_content.appendChild(card_top_info_content_title);

            var card_top_info_content_title = document.createElement("span");
            card_top_info_content_title.className = "main_card_top_info_content_title";
            card_top_info_content_title.innerHTML = "Fatura: " + texto[tamanho - 1].substring(15, 15 + fatura);
            card_top_info_content.appendChild(card_top_info_content_title);

            var card_top_info_content_title = document.createElement("span");
            card_top_info_content_title.className = "main_card_top_info_content_title";
            console.log(15 + (fatura*2))
            card_top_info_content_title.innerHTML = "Valor Total: " + texto[tamanho - 1].substring((15 + (fatura*2)),texto[tamanho - 1].length);
            card_top_info_content.appendChild(card_top_info_content_title);

            card_top_info_content.appendChild(card_top_info_content_title);
            card_top_info.appendChild(card_top_info_content)
            card_main_top.appendChild(card_top_info);

        } else {

        }

    };

    const handleChangeFatura = (event) => {
        setFatura(event.target.value);
    };

    const handleChangeConhecimento = (event) => {
        setConhecimento(event.target.value);
    };

    const handleChangeDocumento = (event) => {
        setDocumento(event.target.value);
    };

    const handleChangeArquivo = () => {
        var preview = document.getElementById("edi-text");
        var file = document.querySelector("input[type=file]").files[0];
        console.log(file);

        var reader = new FileReader();

        reader.onloadstart = function (event) {
            preview.innerHTML = "";
            preview.innerHTML = event.target.result;
            setTexto(true);
        }
        reader.onload = function (event) {
            preview.innerHTML = "";
            preview.innerHTML = event.target.result;
            setTexto(true);
        };
        reader.readAsText(file);

    };

    return (
        <div>
            <Box className="header">
                <Box className="nav_bar">
                    <div className="title_nav_bar">
                        <div className="logo_div_nav_bar">
                            <img src={Lince} className="logo_nav_bar" alt="logo_lince"></img>
                        </div>
                        <Typography
                            className="teste"
                            sx={{ fontSize: "16pt", fontWeight: "700" }}
                        >
                            Validar documetos de EDI
                        </Typography>
                    </div>
                    <Button sx={{ borderRadius: "8px" }}>
                        <DarkModeOutlinedIcon />
                    </Button>
                </Box>
            </Box>
            <Box className="main">
                <Box
                    component="form"
                    autoComplete="off"
                    className="content"
                    display={"grid"}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="content_top">
                        <div className="title_content_top">
                            <Typography sx={{ fontSize: "20pt", fontWeight: "550" }}>
                                Consultar documentos
                            </Typography>
                        </div>
                        <div className="form_content_top">
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="select-fatura">Fatura</InputLabel>
                                <Select
                                    {...register("fatura")}
                                    value={fatura}
                                    label="Fatura"
                                    sx={{ backgroundColor: "white" }}
                                    onChange={handleChangeFatura}
                                >
                                    <MenuItem value={6}>Tamanho 6</MenuItem>
                                    <MenuItem value={7}>Tamanho 7</MenuItem>
                                    <MenuItem value={8}>Tamanho 8</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                                <InputLabel id="select-conhecimento">Conhecimento</InputLabel>
                                <Select
                                    {...register("conhecimento")}
                                    value={conhecimento}
                                    label="Conhecimento"
                                    sx={{ backgroundColor: "white" }}
                                    onChange={handleChangeConhecimento}
                                >
                                    <MenuItem value={6}>Tamanho 6</MenuItem>
                                    <MenuItem value={7}>Tamanho 7</MenuItem>
                                    <MenuItem value={8}>Tamanho 8</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="textField_content_center">
                        <TextField
                            {...register("documento")}
                            value={documento}
                            id="edi-text"
                            label="Electronic Data Interchange (EDI)"
                            multiline
                            focused={texto}
                            rows={20}
                            placeholder="Digite o documento..."
                            sx={{ width: "100%", backgroundColor: "white" }}
                            onChange={handleChangeDocumento}
                        />
                    </div>
                    <div className="textField_content_bottom">
                        <Button
                            variant="outlined"
                            component="label"
                            sx={{ backgroundColor: "white" }}
                        >
                            <FileDownloadRoundedIcon />
                            <Typography>Importar</Typography>
                            <input
                                hidden
                                accept=".txt"
                                multiple
                                type="file"
                                onChange={handleChangeArquivo}
                            />
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ fontWeight: "700" }}
                            type="submit"
                        >
                            Validar
                        </Button>
                    </div>
                </Box>
            </Box>
            <Box className="card" >
                <Box className="main_card" id="main_card">
                </Box>
            </Box>
        </div>
    );
}
