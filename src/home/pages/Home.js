import * as React from "react";
import './Home.css';
import '../javascript/HomeValidador';
import { useForm } from "react-hook-form";
import Lince from '../images/lince.png';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import { Button } from "@mui/material";

export default function Home() {

    const { register, handleSubmit } = useForm();

    const [fatura, setFatura] = React.useState(6);
    const [conhecimento, setConhecimento] = React.useState(6);
    const [documento, setDocumento] = React.useState();

    const onSubmit = async data => {
        console.log(data.documento.split('\n')[1]);
    }

    const handleChangeFatura = (event) => {
        setFatura(event.target.value);
    };

    const handleChangeConhecimento = (event) => {
        setConhecimento(event.target.value);
    };

    const handleChangeDocumento = (event) => {
        setDocumento(event.target.value);
    }

    const handleChangeArquivo = (event) => {
        var reader = new FileReader();
        reader.readAsText(event.target.value, "UTF-8");
        reader.onload = function (evt) {
            console.log(evt.target.result);
            setDocumento(evt.target.result);
        }


    }

    return (
        <div>
            <Box className="header">
                <Box className="nav_bar">
                    <div className="title_nav_bar">
                        <div className="logo_div_nav_bar">
                            <img src={Lince} className="logo_nav_bar" alt="logo_lince"></img>
                        </div>
                        <Typography className="teste" sx={{ fontSize: '16pt', fontWeight: '700' }}>Validar documetos de EDI</Typography>
                    </div>
                    <Button sx={{ borderRadius: '8px' }}>
                        <DarkModeOutlinedIcon />
                    </Button>
                </Box>
            </Box>

            <Box className="main">
                <Box component="form" autoComplete="off" className="content" display={'grid'} onSubmit={handleSubmit(onSubmit)}>
                    <div className="content_top">
                        <div className="title_content_top">
                            <Typography sx={{ fontSize: '20pt', fontWeight: '550' }}>Consultar documentos</Typography>
                        </div>
                        <div className="form_content_top">
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="select-fatura">Fatura</InputLabel>
                                <Select
                                    {...register('fatura')}
                                    value={fatura}
                                    label="Fatura"
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
                                    {...register('conhecimento')}
                                    value={conhecimento}
                                    label="Conhecimento"
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
                            {...register('documento')}
                            value={documento}
                            id="edi-text"
                            label="Electronic Data Interchange (EDI)"
                            multiline
                            rows={20}
                            placeholder="Digite o documento..."
                            sx={{ width: '100%' }}
                            onChange={handleChangeDocumento}
                        />
                    </div>
                    <div className="textField_content_bottom">
                        <Button variant="outlined" component="label">
                            <FileDownloadRoundedIcon />
                            <Typography>Importar</Typography>
                            <input hidden accept=".txt" multiple type="file" onChange={handleChangeArquivo} />
                        </Button>
                        <Button variant="contained" sx={{ fontWeight: '700' }} type='submit'>Validar</Button>
                    </div>
                </Box>
            </Box>
        </div>
    );
}