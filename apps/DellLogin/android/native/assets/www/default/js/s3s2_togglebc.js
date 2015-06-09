
/* JavaScript content from js/s3s2_togglebc.js in folder common */
function togglebc()
{
var bc = document.getElementById('bc');
var bcp = document.getElementById('bcp');
if(bcp.style.opacity == '0')
{
	bcp.style.opacity = '1';
//	bcp.style.display = 'inline';
	//setTimeout(openNativePage(),1000);
}
openNativePage();
}