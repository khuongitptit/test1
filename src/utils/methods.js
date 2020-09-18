import tree from './VNaddress.json';
import _ from 'lodash';
const removeAccents = str => {
	var AccentsMap = [
		'aàảãáạăằẳẵắặâầẩẫấậ',
		'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
		'dđ',
		'DĐ',
		'eèẻẽéẹêềểễếệ',
		'EÈẺẼÉẸÊỀỂỄẾỆ',
		'iìỉĩíị',
		'IÌỈĨÍỊ',
		'oòỏõóọôồổỗốộơờởỡớợ',
		'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
		'uùủũúụưừửữứự',
		'UÙỦŨÚỤƯỪỬỮỨỰ',
		'yỳỷỹýỵ',
		'YỲỶỸÝỴ',
	];
	for (var i = 0; i < AccentsMap.length; i++) {
		var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
		var char = AccentsMap[i][0];
		str = str.replace(re, char);
	}
	return str;
};
export const searchLocation = keyword => {
	const formattedKeyword = keyword.trim().toLowerCase();
	if (formattedKeyword == '') return [];
	let res = [];
	tree.forEach(city => {
		if (removeAccents(city.name).toLowerCase().includes(formattedKeyword)) {
			city.quanHuyen.forEach(qh => {
				res.push({
					city: city.name,
					district: qh.name,
				});
			});
		}
		city.quanHuyen.forEach(qh => {
			if (removeAccents(qh.name).toLowerCase().includes(formattedKeyword)) {
				if(!_.includes(res,{
					city: city.name,
					district: qh.name,
				})){
					res.push({
						city: city.name,
						district: qh.name,
					})
				}
			}
		});
	});
	return res.filter((location, index, self) =>
  index === self.findIndex((l) => (
    l.city === location.city && l.district === location.district
  ))
)
};
export const searchWard = ({ cityName, districtName }, keyword) => {
	const formattedKeyword = keyword.trim().toLowerCase();
	if (_.isNil(cityName) || _.isNil(districtName) || formattedKeyword == '') return [];
	let res = [];
	tree.forEach(city => {
		if (city.name == cityName) {
			city.quanHuyen.forEach(qh => {
				if (qh.name == districtName) {
					qh.xaPhuong.forEach(xp => {
						if (removeAccents(xp).toLowerCase().includes(keyword)) {
							res.push(xp);
						}
					});
				}
			});
		}
	});
	return res
};
