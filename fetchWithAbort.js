
import Promise from "bluebird";

/**
 * ajax('url').then(data=>{}).catch(err=>{});
 * examples
 * header:{'Content-Type':'text/xml'}
 *
 * Contentypes:"application/json",'text/xml' ;
 * cf. fetch
 */
function fetchWithAbort(url,config) {
	var body=config.body;
	var method=config.method;
	var header=config.header;//TODO
	method=method||body?'POST':'GET';
	var xhr = new XMLHttpRequest();
	var prom = new Promise(function (resolve, reject, onCancel) {
		try {
			xhr.open(method||body?'POST':'GET', url);
		} catch (e) {
			reject(e);
		}
		if(header){
			for(var key in header){
				xhr.setRequestHeader(key,header[key]);
			}	
		}
		xhr.onerror=reject;
		
		
		xhr.onload= function(){
			var status = (xhr.status === 1223) ? 204 :(xhr.status === 0 && (xhr.location || {}).protocol === 'file:') ? 200 : xhr.status;
			if ((status >= 200 && status < 300) || (status === 304) || (status === '')){
				//wraps response in fetch adapter
				var res={
					status:xhr.status,

					text:function(){return Promise.resolve(xhr.responseText)},
					json:function(){return Promise.resolve(JSON.parse(xhr.responseText))}
					
				}
				resolve(res);
			}
			else {
				reject(xhr.status);
			}
		};
		xhr.send(body);
		onCancel(()=>{
			xhr.abort();
		})
	});
	//prom=new PromiseWithAbort(prom,xhr);
	return prom;
}

export default fetchWithAbort;