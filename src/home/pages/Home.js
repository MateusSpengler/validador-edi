import * as React from "react";
import { useState } from "react";
import "./Home.css";
import "../javascript/HomeValidador";
import { useForm } from "react-hook-form";
import Lince from "../images/lince.png";
import Calendar from "../images/calendar.jpg"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import { Button, Card } from "@mui/material";

export default function Home() {
    const { register, handleSubmit } = useForm();

    const [fatura, setFatura] = React.useState(6);
    const [texto, setTexto] = React.useState(false);
    const [conhecimento, setConhecimento] = React.useState(6);
    const [documento, setDocumento] = React.useState();
    const [auxiliar, setAuxiliar] = React.useState([]);
    const [edi, setEdi] = useState([]);
    const [tamanho, setTamanho] = useState([]);

    const onSubmit = (data) => {

        const textoGeral = data.documento.trim().split("\n");
        const tamanhoGeral = data.documento.trim().split("\n").length;

        setTamanho(tamanhoGeral)

        setAuxiliar([])

        if (textoGeral[tamanhoGeral - 1].length >= 43 && textoGeral[tamanhoGeral - 1].length <= 45) {

            var tamanhoData = 15 + fatura; //TAMANHO PADRAO DATA RESUMO

            // CARREGANDO DADOS PARA RESUMO

            var indicadorResumo = textoGeral[tamanhoGeral - 1].substring(0, 1);
            var cnpjResumo = textoGeral[tamanhoGeral - 1].substring(1, 15);
            var boletoResumo = textoGeral[tamanhoGeral - 1].substring(15, 15 + fatura);
            var dataVencimentoResumo = textoGeral[tamanhoGeral - 1].substring(tamanhoData, tamanhoData + 2) + "/" + textoGeral[tamanhoGeral - 1].substring(tamanhoData + 2, tamanhoData + 4) + "/" + textoGeral[tamanhoGeral - 1].substring(tamanhoData + 4, tamanhoData + 8);
            var valorTotalFaturaResumo = textoGeral[tamanhoGeral - 1].substring(parseInt(tamanhoData) + parseInt(8), textoGeral[tamanhoGeral - 1].length);

            auxiliar.push({ id: 0, edi: textoGeral[tamanhoGeral - 1], indicador: indicadorResumo, cnpj: cnpjResumo, boleto: boletoResumo, data: dataVencimentoResumo, valorTotal: valorTotalFaturaResumo });

            // CARREGANDO DADOS DAS NOTAS

            var y = 1;

            for (var i = 0; i < (tamanhoGeral - 1); i++) {
                if (textoGeral[i] !== '') {

                    var tamanhoAuxiliar1 = 0;
                    var tamanhoAuxiliar2 = 0;

                    var indicadorNota = textoGeral[i].substring(0, 1);
                    var cnpjNota = textoGeral[i].substring(1, 15);
                    tamanhoAuxiliar1 = fatura + 15;
                    var boletoNota = textoGeral[i].substring(15, tamanhoAuxiliar1);
                    tamanhoAuxiliar2 = fatura + 16;
                    var indicadorDevolucaoNota = textoGeral[i].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);
                    tamanhoAuxiliar1 = tamanhoAuxiliar2;
                    tamanhoAuxiliar2 = parseInt(tamanhoAuxiliar2) + parseInt(4);
                    var serieFiscaisNota = textoGeral[i].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);
                    tamanhoAuxiliar1 = tamanhoAuxiliar2;
                    tamanhoAuxiliar2 = parseInt(tamanhoAuxiliar2) + parseInt(4);
                    var cfopNota = textoGeral[i].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);
                    tamanhoAuxiliar1 = tamanhoAuxiliar2;
                    tamanhoAuxiliar2 = parseInt(tamanhoAuxiliar2) + parseInt(2);
                    var ocorrenciaCfopNota = textoGeral[i].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);
                    tamanhoAuxiliar1 = tamanhoAuxiliar2;
                    tamanhoAuxiliar2 = parseInt(tamanhoAuxiliar2) + parseInt(6);
                    var conhecimentoNota = textoGeral[i].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);
                    tamanhoAuxiliar1 = tamanhoAuxiliar2;
                    tamanhoAuxiliar2 = parseInt(tamanhoAuxiliar2) + parseInt(8);
                    var dataEmissaoNota = textoGeral[i].substring(tamanhoAuxiliar1, tamanhoAuxiliar1 + 2) + "/" + textoGeral[i].substring(tamanhoAuxiliar1 + 2, tamanhoAuxiliar1 + 4) + "/" + textoGeral[i].substring(tamanhoAuxiliar1 + 4, tamanhoAuxiliar1 + 8);                    
                    tamanhoAuxiliar1 = tamanhoAuxiliar2;
                    tamanhoAuxiliar2 = parseInt(tamanhoAuxiliar2) + parseInt(14);
                    var valorFreteNota = textoGeral[i].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);
                    tamanhoAuxiliar1 = tamanhoAuxiliar2;
                    tamanhoAuxiliar2 = parseInt(tamanhoAuxiliar2) + parseInt(14);
                    var valorDescontoNota = textoGeral[i].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);
                    tamanhoAuxiliar1 = tamanhoAuxiliar2;
                    tamanhoAuxiliar2 = parseInt(tamanhoAuxiliar2) + parseInt(14);
                    var valorAbatimentoNota = textoGeral[i].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);
                    tamanhoAuxiliar1 = tamanhoAuxiliar2;
                    tamanhoAuxiliar2 = parseInt(tamanhoAuxiliar2) + parseInt(14);
                    var valorAcrescimoNota = textoGeral[i].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);
                    tamanhoAuxiliar1 = tamanhoAuxiliar2;
                    tamanhoAuxiliar2 = parseInt(tamanhoAuxiliar2) + parseInt(14);
                    var valorBaseIcmsNota = textoGeral[i].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);
                    tamanhoAuxiliar1 = tamanhoAuxiliar2;
                    tamanhoAuxiliar2 = parseInt(tamanhoAuxiliar2) + parseInt(14);
                    var valorIcmsNota = textoGeral[i].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);
                    tamanhoAuxiliar1 = tamanhoAuxiliar2;
                    tamanhoAuxiliar2 = parseInt(tamanhoAuxiliar2) + parseInt(5);
                    var porcentagemAliquotaNota = textoGeral[i].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);
                    tamanhoAuxiliar1 = tamanhoAuxiliar2;
                    tamanhoAuxiliar2 = parseInt(tamanhoAuxiliar2) + parseInt(6);
                    var notaFiscalNota = textoGeral[i].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);

                    console.log('TESTE: ' + notaFiscalNota);

                    auxiliar.push({ id: y, edi: textoGeral[i], indicador: indicadorNota, cnpj: cnpjNota, boleto: boletoNota, indicadorDevolucao: indicadorDevolucaoNota, serieFiscais: serieFiscaisNota, cfop: cfopNota, ocorrenciaCfop: ocorrenciaCfopNota, conhecimento: conhecimentoNota, dataEmissao: dataEmissaoNota, valorFrete: valorFreteNota, valorDesconto: valorDescontoNota, valorAbatimento: valorAbatimentoNota, valorAcrescimo: valorAcrescimoNota, valorBaseIcmsNota: valorBaseIcmsNota, valorIcms: valorIcmsNota, porcentagemAliquota: porcentagemAliquotaNota, notaFiscal: notaFiscalNota});

                    y++;
                }
            }
            setEdi(auxiliar)
            console.log(edi)
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
                        {/* <Button
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
                        </Button> */}
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
                <Box className="main_card" >
                    {edi[0] && (
                        <Box className="main_card_top">
                            <Card className="main_card_top_notas">
                                <Typography sx={{ fontSize: '32pt' }}>{tamanho}</Typography>
                                <Typography sx={{ fontSize: '12pt' }}>Notas</Typography>
                            </Card>
                            <Card className="main_card_top_notas">
                                <Typography sx={{ fontSize: '32pt' }}>#{edi[0].indicador}</Typography>
                                <Typography sx={{ fontSize: '12pt' }}>{edi[0].indicador === 1 ? 'Conhecimento' : 'Pagamento'}</Typography>
                            </Card>
                            <Card className="main_card_top_data">
                                <Box>
                                    <img alt="calendario" className="main_card_top_data_img" src={Calendar} />
                                </Box>
                                <Typography>{edi[0].data}</Typography>
                            </Card>
                            <Card className="main_card_top_infos">
                                <Box sx={{ marginLeft: '15px' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography sx={{ fontSize: '13pt' }}><b>CNPJ:</b> {edi[0].boleto}</Typography>
                                        <Typography sx={{ marginLeft: '15px', fontSize: '13pt' }}><b>Valor Total:</b> {edi[0].valorTotal}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ fontSize: '24pt' }}><b>Boleto:</b> {edi[0].cnpj}</Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Box>
                    )}
                    {edi.map((key) => (
                        <div style={{ display: 'grid', width: '100%' }}>
                            {key.id}
                        </div>
                    ))}
                </Box>
            </Box>
        </div>
    );

}
