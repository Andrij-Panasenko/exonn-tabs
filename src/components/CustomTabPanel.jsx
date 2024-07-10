import Box from '@mui/material/Box';

export default function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      data-custom="CustomTabPanel"
      {...other}
    >
      {value === index && (
        <Box className='qweqwe'>
          <div className="tab-content-container">
            <div className="tab-content">{children}</div>
          </div>
        </Box>
      )}
    </div>
  );
}
