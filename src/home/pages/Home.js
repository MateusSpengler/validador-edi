import * as React from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import NavigationIcon from '@mui/icons-material/Navigation';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeRounded';
import { Button, Card, Divider, Select, FormControl, MenuItem, InputLabel, TextField, Typography, Box, Fab } from "@mui/material";
import Lince from "../images/lince.png";
import Calendar from "../images/calendar.jpg"
import Swal from 'sweetalert2'
import "./Home.css";
import "../javascript/HomeValidador";

export default function Home() {
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            fatura: '6',
            conhecimento: '6',
        }
    });

    const [documento, setDocumento] = React.useState();
    const [auxiliar, setAuxiliar] = React.useState([]);
    const [edi, setEdi] = useState([]);

    function validarCNPJ(cnpj) {

        cnpj = cnpj.replace(/[^\d]+/g, '');



        if (cnpj === '') return false;

        if (cnpj.length !== 14) {
            console.log('1');
            return false;
        }


        // Elimina CNPJs invalidos conhecidos
        if (cnpj === "00000000000000" ||
            cnpj === "11111111111111" ||
            cnpj === "22222222222222" ||
            cnpj === "33333333333333" ||
            cnpj === "44444444444444" ||
            cnpj === "55555555555555" ||
            cnpj === "66666666666666" ||
            cnpj === "77777777777777" ||
            cnpj === "88888888888888" ||
            cnpj === "99999999999999") {
            console.log('2');
            return false;
        }


        // Valida DVs
        var tamanho = cnpj.length - 2
        var numeros = cnpj.substring(0, tamanho);
        var digitos = cnpj.substring(tamanho);
        var soma = 0;
        var pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        console.log('resultado: ' + resultado)
        console.log('chart: ' + digitos.charAt(0))
        if (parseInt(resultado) !== parseInt(digitos.charAt(0))) {
            console.log('3');
            return false;
        }


        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (parseInt(resultado) !== parseInt(digitos.charAt(1))) {
            console.log('4');
            return false;
        }

        return true;
    }

    function checarData(data) {
        return data instanceof Date && !isNaN(data);
    }

    const onSubmit = (data) => {

        const textoGeral = data.documento.trim().split("\n");
        const tamanhoGeral = data.documento.trim().split("\n").length;
        const tamanhoFatura = data.fatura;
        const tamanhoConhecimento = data.conhecimento;

        setAuxiliar([])

        if (textoGeral[tamanhoGeral - 1].length >= 43 && textoGeral[tamanhoGeral - 1].length <= 45) {

            var tamanhoAuxiliar1 = 0;
            var tamanhoAuxiliar2 = 0;

            // CARREGANDO DADOS PARA RESUMO

            var indicadorResumo = textoGeral[tamanhoGeral - 1].substring(0, 1);

            var descricaoIndicadorResumo = 'Inválido';

            if (parseInt(textoGeral[tamanhoGeral - 1].substring(0, 1)) === 1) {
                descricaoIndicadorResumo = 'Conhecimento';
            } else if (parseInt(textoGeral[tamanhoGeral - 1].substring(0, 1)) === 2) {
                descricaoIndicadorResumo = 'Pagamento';
            }

            tamanhoAuxiliar1 = 1;
            tamanhoAuxiliar2 = 15;

            var notasResumo = parseInt(tamanhoGeral) - 1;
            var cnpjAuxiliar = textoGeral[tamanhoGeral - 1].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);
            var cnpjResumo = cnpjAuxiliar.substring(0, 2) + "." + cnpjAuxiliar.substring(2, 5) + "." + cnpjAuxiliar.substring(5, 8) + "/" + cnpjAuxiliar.substring(8, 12) + "-" + cnpjAuxiliar.substring(12, 14);

            var cnpjCheckIndicadorResumo = validarCNPJ(cnpjAuxiliar);

            tamanhoAuxiliar1 = tamanhoAuxiliar2;
            tamanhoAuxiliar2 = parseInt(tamanhoAuxiliar2) + parseInt(tamanhoFatura);
            var boletoResumo = textoGeral[tamanhoGeral - 1].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);
            tamanhoAuxiliar1 = tamanhoAuxiliar2;
            tamanhoAuxiliar2 = tamanhoAuxiliar2 + 8;
            var dataVencimentoResumo = textoGeral[tamanhoGeral - 1].substring(tamanhoAuxiliar1 + 6, tamanhoAuxiliar1 + 8) + "/" + textoGeral[tamanhoGeral - 1].substring(tamanhoAuxiliar1 + 4, tamanhoAuxiliar1 + 6) + "/" + textoGeral[tamanhoGeral - 1].substring(tamanhoAuxiliar1, tamanhoAuxiliar1 + 4);


            var dataCheckResumo = new Date(textoGeral[tamanhoGeral - 1].substring(tamanhoAuxiliar1 + 4, tamanhoAuxiliar1 + 6) + "/" + textoGeral[tamanhoGeral - 1].substring(tamanhoAuxiliar1 + 6, tamanhoAuxiliar1 + 8) + "/" + textoGeral[tamanhoGeral - 1].substring(tamanhoAuxiliar1, tamanhoAuxiliar1 + 4));

            var dataCheckIndicadorResumo = false;

            if (checarData(dataCheckResumo)) {
                dataCheckIndicadorResumo = true;
            }

            tamanhoAuxiliar1 = tamanhoAuxiliar2;
            tamanhoAuxiliar2 = textoGeral[tamanhoGeral - 1].length;
            var valorTotalFaturaResumo = textoGeral[tamanhoGeral - 1].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);

            auxiliar.push({ id: 0, quantidadeNotas: notasResumo, edi: textoGeral[tamanhoGeral - 1], indicador: indicadorResumo, descricaoIndicador: descricaoIndicadorResumo, cnpj: cnpjResumo, cnpjCheckIndicador: cnpjCheckIndicadorResumo, boleto: boletoResumo, data: dataVencimentoResumo, dataCheckIndicador: dataCheckIndicadorResumo, valorTotal: valorTotalFaturaResumo });

            // CARREGANDO DADOS DAS NOTAS

            var y = 1;

            for (var i = 0; i < (tamanhoGeral - 1); i++) {
                if (textoGeral[i] !== '') {

                    tamanhoAuxiliar1 = 0;
                    tamanhoAuxiliar2 = 0;

                    var descricaoIndicadorNota = 'Inválido';

                    if (parseInt(textoGeral[i].substring(0, 1)) === 1) {
                        descricaoIndicadorNota = 'Conhecimento';
                    } else if (parseInt(textoGeral[i].substring(0, 1)) === 2) {
                        descricaoIndicadorNota = 'Pagamento';
                    }

                    var descricaoIndicadorDevolucaoNota = "Inválido";

                    if (parseInt(textoGeral[i].substring(15, 16)) === 0) {
                        descricaoIndicadorDevolucaoNota = "Normal";
                    } else if (parseInt(textoGeral[i].substring(15, 16)) === 1) {
                        descricaoIndicadorDevolucaoNota = "Devolução";
                    }

                    var indicadorNota = textoGeral[i].substring(0, 1);
                    var cnpjAuxiliarNota = textoGeral[i].substring(1, 15);
                    var cnpjNota = cnpjAuxiliarNota.substring(0, 2) + "." + cnpjAuxiliarNota.substring(2, 5) + "." + cnpjAuxiliarNota.substring(5, 8) + "/" + cnpjAuxiliarNota.substring(8, 12) + "-" + cnpjAuxiliarNota.substring(12, 14);
                    var cnpjCheckIndicadorNota = validarCNPJ(cnpjAuxiliarNota);
                    console.log('OPA: ' + cnpjCheckIndicadorNota)
                    tamanhoAuxiliar2 = parseInt(tamanhoFatura) + 15;
                    var boletoNota = textoGeral[i].substring(15, tamanhoAuxiliar2);
                    tamanhoAuxiliar1 = 15;
                    tamanhoAuxiliar2 = parseInt(tamanhoFatura) + 16;
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
                    tamanhoAuxiliar2 = parseInt(tamanhoAuxiliar2) + parseInt(tamanhoConhecimento);
                    var conhecimentoNota = textoGeral[i].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);
                    tamanhoAuxiliar1 = tamanhoAuxiliar2;
                    tamanhoAuxiliar2 = parseInt(tamanhoAuxiliar2) + parseInt(8);
                    var dataEmissaoNota = textoGeral[i].substring(tamanhoAuxiliar1 + 6, tamanhoAuxiliar1 + 8) + "/" + textoGeral[i].substring(tamanhoAuxiliar1 + 4, tamanhoAuxiliar1 + 6) + "/" + textoGeral[i].substring(tamanhoAuxiliar1, tamanhoAuxiliar1 + 4);

                    var dataCheckNota = new Date(textoGeral[i].substring(tamanhoAuxiliar1 + 4, tamanhoAuxiliar1 + 6) + "/" + textoGeral[i].substring(tamanhoAuxiliar1 + 6, tamanhoAuxiliar1 + 8) + "/" + textoGeral[i].substring(tamanhoAuxiliar1, tamanhoAuxiliar1 + 4));

                    var dataCheckIndicadorNota = false;

                    if (checarData(dataCheckNota)) {
                        dataCheckIndicadorNota = true;
                    }

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

                    auxiliar.push({ id: y, edi: textoGeral[i], indicador: indicadorNota, descricaoIndicador: descricaoIndicadorNota, cnpj: cnpjNota, cnpjCheckIndicador: cnpjCheckIndicadorNota, boleto: boletoNota, indicadorDevolucao: indicadorDevolucaoNota, descricaoIndicadorDevolucao: descricaoIndicadorDevolucaoNota, serieFiscais: serieFiscaisNota, cfop: cfopNota, ocorrenciaCfop: ocorrenciaCfopNota, conhecimento: conhecimentoNota, dataEmissao: dataEmissaoNota, dataCheckIndicador: dataCheckIndicadorNota, valorFrete: valorFreteNota, valorDesconto: valorDescontoNota, valorAbatimento: valorAbatimentoNota, valorAcrescimo: valorAcrescimoNota, valorBaseIcms: valorBaseIcmsNota, valorIcms: valorIcmsNota, porcentagemAliquota: porcentagemAliquotaNota, notaFiscal: notaFiscalNota });

                    y++;

                }
            }
            setEdi(auxiliar)
            console.log(edi)

            document.getElementById("main_card").scrollIntoView()

        } else {

            setAuxiliar([])
            setEdi(auxiliar)

            Swal.fire({
                title: 'Erro',
                text: 'Documento não possui resumo!',
                icon: 'error',
                confirmButtonText: 'Confirmar',
                confirmButtonColor: '#626262'
            })
        }

    };

    const handleChangeDocumento = (event) => {
        setDocumento(event.target.value);
    };

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const formatterPercent = new Intl.NumberFormat('pt-BR', {
        style: 'percent',
    });

    return (
        <div>
            <Box className="header">
                <Box className="nav_bar" id="menu">
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
                                <Controller name="fatura" control={control} render={({ field }) =>
                                    <Select
                                        {...field}
                                        label="Fatura"
                                        sx={{ backgroundColor: "white" }}

                                        {...register("fatura")}
                                    >
                                        <MenuItem value={6}>Tamanho 6</MenuItem>
                                        <MenuItem value={7}>Tamanho 7</MenuItem>
                                        <MenuItem value={8}>Tamanho 8</MenuItem>
                                    </Select>
                                } />
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                                <InputLabel id="select-conhecimento">Conhecimento</InputLabel>
                                <Controller name="conhecimento" control={control} render={({ field }) =>
                                    <Select
                                        {...field}
                                        label="Conhecimento"
                                        sx={{ backgroundColor: "white" }}

                                        {...register("conhecimento")}
                                    >
                                        <MenuItem value={6}>Tamanho 6</MenuItem>
                                        <MenuItem value={7}>Tamanho 7</MenuItem>
                                        <MenuItem value={8}>Tamanho 8</MenuItem>
                                    </Select>
                                } />
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
                            rows={20}
                            placeholder="Digite o documento..."
                            sx={{ width: "100%", backgroundColor: "white" }}
                            onChange={handleChangeDocumento}
                        />
                    </div>
                    <div className="textField_content_bottom">
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
                    {edi[0] && (
                        <Box key={edi[0].id} className="main_card_top">
                            <Card className="main_card_top_notas">
                                <Typography sx={{ fontSize: '32pt', fontWeight: 'bold' }}>{edi[0].quantidadeNotas}</Typography>
                                <Typography sx={{ fontSize: '12pt', fontWeight: 'bold' }}>Notas</Typography>
                            </Card>
                            <Card className="main_card_top_notas">
                                <Typography sx={{ fontSize: '32pt', fontWeight: 'bold' }}>#{edi[0].indicador}</Typography>
                                <Typography sx={{ fontSize: '12pt', fontWeight: 'bold' }}>{edi[0].descricaoIndicador}</Typography>
                            </Card>
                            <Card className="main_card_top_data">
                                <Box>
                                    <img alt="calendario" className="main_card_top_data_img" src={Calendar} />
                                </Box>
                                {edi[0].dataCheckIndicador === true ? (<Typography sx={{ fontWeight: 'bold' }}>{edi[0].data}</Typography>) : (<Typography sx={{ color: '#C41631', fontWeight: 'bold' }}>{edi[0].data}</Typography>)}
                            </Card>
                            <Card className="main_card_top_infos">
                                <Box sx={{ display: 'grid', justifyContent: 'center' }}>
                                    <Box sx={{ display: 'flex', textAlign: 'center' }}>
                                        <Typography sx={{ fontSize: '13pt' }}><b>Boleto: {edi[0].boleto}</b></Typography>
                                        {edi[0].cnpjCheckIndicador === true ? (<Typography sx={{ fontSize: '13pt', marginLeft: '15px' }}><b>CNPJ: {edi[0].cnpj}</b></Typography>) : (<Typography sx={{ color: '#C41631', fontSize: '13pt', marginLeft: '15px' }}><b>CNPJ: {edi[0].cnpj}</b></Typography>)}
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: '16pt', textAlign: 'center' }}><b>Valor Total: {formatter.format(parseInt(edi[0].valorTotal) / 100)}</b></Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Box>

                    )}
                    {edi.map((key) => (
                        <Box style={{ marginTop: '10px' }}>
                            {key.id === 0 ? <></> : (
                                <Card key={key.id} className="main_card_content">

                                    {key.cnpjCheckIndicador === true && key.dataCheckIndicador === true && key.descricaoIndicador !== "Inválido" ? (<Box className="card_content_titulo_id">{key.id}</Box>) : (<Box sx={{ backgroundColor: '#C41631' }} className="card_content_titulo_id">{key.id}</Box>)}

                                    <Box className="card_content_body">
                                        <Box className="card_content_body_info">
                                            {/* <Box sx={{ width: '20%' }}><b>{key.descricaoIndicador}</b></Box> */}

                                            {key.descricaoIndicador !== "Inválido" ? (<Box sx={{ width: '20%' }}><b>{key.descricaoIndicador}</b></Box>) : (<Box sx={{ width: '20%', color: '#C41631' }}><b>{key.descricaoIndicador}</b></Box>)}

                                            <Box sx={{ width: '20%' }}><b>Boleto:</b> {key.boleto}</Box>
                                            <Box sx={{ width: '20%' }}><b>Conhecimento:</b> {key.conhecimento}</Box>
                                            <Box className="card_content_body_infos"><b>Nota Fiscal:</b> {key.notaFiscal}</Box>

                                            {key.cnpjCheckIndicador === true ? (<Box className="card_content_body_infos"><b>CNPJ:</b> {key.cnpj}</Box>) : (<Box sx={{ color: '#C41631' }} className="card_content_body_infos"><b>CNPJ: {key.cnpj}</b></Box>)}
                                        </Box>
                                        <Divider />
                                        <Box className="card_content_body_info">
                                            <Box sx={{ width: '20%' }}><b>{key.descricaoIndicadorDevolucao}</b></Box>
                                            <Box sx={{ width: '20%' }}><b>Serie:</b> {key.serieFiscais}</Box>
                                            <Box sx={{ width: '20%' }}><b>CFOP:</b> {key.cfop}</Box>
                                            <Box className="card_content_body_infos"><b>Ocorrencia: </b> {key.ocorrenciaCfop}</Box>

                                            {key.dataCheckIndicador === true ? (<Box className="card_content_body_infos"><b>Data: </b> {key.dataEmissao}</Box>) : (<Box sx={{ color: '#C41631', fontWeight: 700 }} className="card_content_body_infos"><b>Data:</b> {key.dataEmissao}</Box>)}

                                        </Box>
                                        <Divider />
                                        <Box className="card_content_body_info">
                                            <Box sx={{ width: '20%' }}><b>Desconto:</b> {formatter.format(key.valorDesconto / 100)}</Box>
                                            <Box sx={{ width: '20%' }}><b>Acrescimo:</b> {formatter.format(key.valorAcrescimo / 100)}</Box>
                                            <Box sx={{ width: '20%' }}><b>Abatimento:</b> {formatter.format(key.valorAcrescimo / 100)}</Box>
                                            <Box sx={{ width: '20%' }}><b>Aliquota:</b> {formatterPercent.format(key.porcentagemAliquota / 10)}</Box>
                                        </Box>
                                        <Divider />
                                        <Box className="card_content_body_info">
                                            <Box sx={{ width: '20%' }}><b>Frete:</b> {formatter.format(key.valorFrete / 100)}</Box>
                                            <Box sx={{ width: '20%' }}><b>Base ICMS:</b> {formatter.format(key.valorBaseIcms / 100)}</Box>
                                            <Box sx={{ width: '20%' }}><b>ICMS:</b> {formatter.format(key.valorIcms / 100)}</Box>
                                        </Box>
                                    </Box>
                                    {/* <Box sx={{ display: 'flex', width: '1%', backgroundColor: 'red' }}></Box> */}
                                </Card>
                            )}

                        </Box>
                    ))}
                </Box>
                {() => { document.getElementById("main_card").scrollIntoView() }}
            </Box>
            {/* {pageYPosition > 300 && ( */}
            <a href="#menu" className="back_top">
                <Fab variant="extended" sx={{ position: 'fixed', bottom: '20px', right: '0', marginRight: '20px' }}>
                    <NavigationIcon />
                    Voltar ao Topo
                </Fab>
            </a>
            {/* )} */}

        </div >
    );
}
