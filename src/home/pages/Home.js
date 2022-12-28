import * as React from "react";
import { useState } from "react";
import "./Home.css";
import "../javascript/HomeValidador";
import { useForm, Controller } from "react-hook-form";
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
import Divider from "@mui/material/Divider";
import { Button, Card } from "@mui/material";

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
            var cnpjResumo = textoGeral[tamanhoGeral - 1].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);

            tamanhoAuxiliar1 = tamanhoAuxiliar2;
            tamanhoAuxiliar2 = parseInt(tamanhoAuxiliar2) + parseInt(tamanhoFatura);
            console.log('TESTE: ' + tamanhoAuxiliar1);
            console.log('TESTE: ' + tamanhoAuxiliar2);
            var boletoResumo = textoGeral[tamanhoGeral - 1].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);
            tamanhoAuxiliar1 = tamanhoAuxiliar2;
            tamanhoAuxiliar2 = tamanhoAuxiliar2 + 8;

            var dataVencimentoResumo = textoGeral[tamanhoGeral - 1].substring(tamanhoAuxiliar1 + 6, tamanhoAuxiliar1 + 8) + "/" + textoGeral[tamanhoGeral - 1].substring(tamanhoAuxiliar1 + 4, tamanhoAuxiliar1 + 6) + "/" + textoGeral[tamanhoGeral - 1].substring(tamanhoAuxiliar1, tamanhoAuxiliar1 + 4);
            tamanhoAuxiliar1 = tamanhoAuxiliar2;
            tamanhoAuxiliar2 = textoGeral[tamanhoGeral - 1].length;
            var valorTotalFaturaResumo = textoGeral[tamanhoGeral - 1].substring(tamanhoAuxiliar1, tamanhoAuxiliar2);

            auxiliar.push({ id: 0, quantidadeNotas: notasResumo, edi: textoGeral[tamanhoGeral - 1], indicador: indicadorResumo, descricaoIndicador: descricaoIndicadorResumo, cnpj: cnpjResumo, boleto: boletoResumo, data: dataVencimentoResumo, valorTotal: valorTotalFaturaResumo });

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
                    var cnpjNota = textoGeral[i].substring(1, 15);
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
                    //var dataEmissaoNota = textoGeral[i].substring(tamanhoAuxiliar1, tamanhoAuxiliar1 + 2) + "/" + textoGeral[i].substring(tamanhoAuxiliar1 + 2, tamanhoAuxiliar1 + 4) + "/" + textoGeral[i].substring(tamanhoAuxiliar1 + 4, tamanhoAuxiliar1 + 8);
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

                    auxiliar.push({ id: y, edi: textoGeral[i], indicador: indicadorNota, descricaoIndicador: descricaoIndicadorNota, cnpj: cnpjNota, boleto: boletoNota, indicadorDevolucao: indicadorDevolucaoNota, descricaoIndicadorDevolucao: descricaoIndicadorDevolucaoNota, serieFiscais: serieFiscaisNota, cfop: cfopNota, ocorrenciaCfop: ocorrenciaCfopNota, conhecimento: conhecimentoNota, dataEmissao: dataEmissaoNota, valorFrete: valorFreteNota, valorDesconto: valorDescontoNota, valorAbatimento: valorAbatimentoNota, valorAcrescimo: valorAcrescimoNota, valorBaseIcms: valorBaseIcmsNota, valorIcms: valorIcmsNota, porcentagemAliquota: porcentagemAliquotaNota, notaFiscal: notaFiscalNota });

                    y++;

                }
            }
            setEdi(auxiliar)
            console.log(edi)
        } else {

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
                <Box className="main_card" >
                    {edi[0] && (
                        <Box className="main_card_top">
                            <Card className="main_card_top_notas">
                                <Typography sx={{ fontSize: '32pt' }}>{edi[0].quantidadeNotas}</Typography>
                                <Typography sx={{ fontSize: '12pt' }}>Notas</Typography>
                            </Card>
                            <Card className="main_card_top_notas">
                                <Typography sx={{ fontSize: '32pt' }}>#{edi[0].indicador}</Typography>
                                <Typography sx={{ fontSize: '12pt' }}>{edi[0].descricaoIndicador}</Typography>
                            </Card>
                            <Card className="main_card_top_data">
                                <Box>
                                    <img alt="calendario" className="main_card_top_data_img" src={Calendar} />
                                </Box>
                                <Typography>{edi[0].data}</Typography>
                            </Card>
                            <Card className="main_card_top_infos">
                                <Box sx={{ marginLeft: '15px', display: 'grid', alignContent: 'center' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography sx={{ fontSize: '13pt' }}><b>Boleto:</b> {edi[0].boleto}</Typography>
                                        <Typography sx={{ fontSize: '13pt', marginLeft: '15px' }}><b>CNPJ:</b> {edi[0].cnpj}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ fontSize: '16pt' }}><b>Valor Total:</b> {formatter.format(edi[0].valorTotal / 100)}</Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Box>
                    )}
                    {edi.map((key) => (
                        <div>
                            {key.id === 0 ? <></> : (
                                <Card key={key.id} className="main_card_content">
                                    <Box className="card_content_titulo">
                                        <Box className="card_content_titulo_id">{key.id}</Box>
                                    </Box>
                                    <Box className="card_content_body">
                                        <Box className="card_content_body_info">
                                            <Box sx={{ width: '14%' }}><b>{key.descricaoIndicador}</b></Box>
                                            <Box sx={{ width: '14%' }}><b>Boleto:</b> {key.boleto}</Box>
                                            <Box sx={{ width: '20%' }}><b>Conhecimento:</b> {key.conhecimento}</Box>
                                            <Box className="card_content_body_infos"><b>Nota Fiscal:</b> {key.notaFiscal}</Box>
                                            <Box className="card_content_body_infos"><b>CNPJ:</b> {key.cnpj}</Box>
                                        </Box>
                                        <Box className="card_content_body_info">
                                            <Box sx={{ width: '14%' }}><b>{key.descricaoIndicadorDevolucao}</b></Box>
                                            <Box sx={{ width: '14%' }}><b>Serie:</b> {key.serieFiscais}</Box>
                                            <Box sx={{ width: '20%' }}><b>CFOP:</b> {key.cfop}</Box>
                                            <Box className="card_content_body_infos"><b>Ocorrencia:</b> {key.ocorrenciaCfop}</Box>
                                            <Box className="card_content_body_infos"><b>Data:</b> {key.dataEmissao}</Box>
                                        </Box>
                                        <Divider />
                                        <Box className="card_content_body_info">
                                            <Box sx={{ width: '20%' }}><b>Desconto:</b> {formatter.format(key.valorDesconto / 100)}</Box>
                                            <Box sx={{ width: '20%' }}><b>Acrescimo:</b> {formatter.format(key.valorAcrescimo / 100)}</Box>
                                            <Box sx={{ width: '20%' }}><b>Abatimento:</b> {formatter.format(key.valorAcrescimo / 100)}</Box>
                                            <Box sx={{ width: '20%' }}><b>Aliquota:</b> {parseInt(key.porcentagemAliquota)} %</Box>
                                        </Box>
                                        <Box className="card_content_body_info">
                                            <Box sx={{ width: '30%' }}><b>Frete:</b> {formatter.format(key.valorFrete / 100)}</Box>
                                            <Box sx={{ width: '30%' }}><b>Base ICMS:</b> {formatter.format(key.valorBaseIcms / 100)}</Box>
                                            <Box sx={{ width: '30%' }}><b>ICMS:</b> {formatter.format(key.valorIcms / 100)}</Box>
                                        </Box>
                                    </Box>
                                </Card>
                            )}
                        </div>
                    ))}
                </Box>
            </Box>
        </div>
    );
}
