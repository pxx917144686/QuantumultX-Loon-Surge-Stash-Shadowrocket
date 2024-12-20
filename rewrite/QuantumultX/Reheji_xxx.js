/*
# @ pxx917144686

[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/pxx917144686/QuantumultX-Loon-Surge-Stash-Shadowrocket/refs/heads/master/rewrite/QuantumultX/Reheji_xxx.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/pxx917144686/QuantumultX-Loon-Surge-Stash-Shadowrocket/refs/heads/master/rewrite/QuantumultX/Reheji_xxx.js
[mitm]
hostname = api.revenuecat.com, api.rc-backup.com

*************************************/
let chxm1024 = {}, chxm1023 = JSON.parse(typeof $response != "undefined" && $response.body || "{}");
const headers = $request.headers, ua = headers['User-Agent'] || headers['user-agent'], bundle_id = headers['X-Client-Bundle-ID'] || headers['x-client-bundle-id'];

const bundle = {
  'design.yugen.Flow': { name: 'pro', id: 'design.yugen.Flow.Lifetime', cm: 'sja' },  //Flow-番茄工作
};  
  
const listua = {
  '%E8%B0%9C%E5%BA%95%E6%97%B6%E9%92%9F': { name: 'Entitlement.Pro', id: 'tech.miidii.MDClock.pro', cm: 'sjb' },  //目标地图
};

if (typeof $rocket !== 'undefined') {
    function getBoxJSValue(_0x10072f) {
        var _0x372641 = {
            'CGPKE': function _0x16eb0e(_0x2df85e, _0x40e466) {
                return _0x2df85e !== _0x40e466;
            },
            'wvWLg': 'undefined',
            'rNaYN': function _0x31ef0d(_0x559f7a, _0x53a42d) {
                return _0x559f7a === _0x53a42d;
            },
            'XBQWj': 'function',
            'ATuAF': 'Hfp',
            'vEgsa': 'jCA',
            'SWEmP': 'qAV',
            'fWKIU': '无法检测到 BoxJS 环境！',
            'QRyOj': function _0x275932(_0x270910, _0x188bb4) {
                return _0x270910(_0x188bb4);
            }
        };
        try {
            if (_0x372641.CGPKE(typeof $persistentStore, _0x372641.wvWLg) && _0x372641.rNaYN(typeof $persistentStore['read'], _0x372641.XBQWj)) {
                if (_0x372641.ATuAF === _0x372641['vEgsa']) {
                    reject('HTTP Error: ' + response['status']);
                } else {
                    const _0xd4c9a6 = $persistentStore.read(_0x10072f);
                    console.log('成功读取 BoxJS 值（$persistentStore）：' + _0x10072f + ' = ' + _0xd4c9a6);
                    return _0xd4c9a6;
                }
            } else if (_0x372641.CGPKE(typeof $prefs, _0x372641.wvWLg) && typeof $prefs.valueForKey === _0x372641['XBQWj']) {
                const _0x3f0151 = $prefs['valueForKey'](_0x10072f);
                console['log']('🔍 成功读取 BoxJS 值（$prefs）：' + _0x10072f + ' = ' + _0x3f0151);
                return _0x3f0151;
            } else {
                if (_0x372641.rNaYN(_0x372641.SWEmP, _0x372641.SWEmP)) {
                    console.log(_0x372641.fWKIU);
                } else {
                    _0x372641.QRyOj(resolve, Object['assign'](response, {
                        'body': data
                    }));
                }
            }
        } catch (_0x35f344) {
            console.log('读取 BoxJS 配置失败：' + _0x35f344['message']);
        }
        return null;
    }
    const scriptSwitch = getBoxJSValue('ddm.app_switch');
    const isScriptEnabled = scriptSwitch === 'true' || scriptSwitch === true;
    console['log']('BoxJS 配置读取：ddm.app_switch = ' + scriptSwitch);
    if (!isScriptEnabled) {
        console.log('BoxJS 配置禁用脚本，脚本停止运行');
        $notification.post('脚本异常', '脚本开关未打开'\
配置Boxjs→订阅链接`);
        $done();
    }
}
const finalize = function (_0x5e758d = null) {
    var _0x4a5612 = {
        'EGiYb': `成功`,
        'VOmoh': function _0x5e55bf(_0x212137, _0x32818a) {
            return _0x212137(_0x32818a);
        }
    };
    if (_0x5e758d) {
        pxx917144686.body = JSON.stringify(_0x5e758d);
        console.log(_0x4a5612.EGiYb);
    }
    _0x4a5612.VOmoh($done, pxx917144686);
};
if (typeof $response === 'undefined') {
    delete headers['x-revenuecat-etag'];
    delete headers['X-RevenueCat-ETag'];
    pxx917144686.headers = headers;
    finalize();
} else {
    if (/(offerings|attributes|adservices_attribution)/ ['test']($request.url)) {
        console.log('检测到已屏蔽的URL，跳过脚本执行。');
        $done({});
    }
    const timea = {
        'purchase_date': '2024-09-09T09:09:09Z',
        'expires_date': '2099-09-09T09:09:09Z'
    };
    const timeb = {
        'original_purchase_date': '2024-09-09T09:09:09Z',
        'is_sandbox': false,
        'store_transaction_id': '490001314520000',
        'store': 'app_store',
        'ownership_type': 'PURCHASED'
    };
    let name, nameb, ids, idb, data;
    let anchor = false,
        localMatched = false;
    for (const src of [listua, bundle]) {
        for (const i in src) {
            const test = src === listua ? ua : bundle_id;
            if (new RegExp('^' + i, 'i').test(test)) {
                if (src[i]['cm'].includes('sja')) {
                    data = timea;
                    anchor = true;
                } else if (src[i]['cm'].includes('sjb')) {
                    data = {
                        'purchase_date': '2024-09-09T09:09:09Z'
                    };
                    anchor = true;
                } else if (src[i]['cm'].includes('sjc')) {
                    data = timea;
                    anchor = false;
                }
                ids = src[i]['id'];
                name = src[i].name || '';
                idb = src[i].idb;
                nameb = src[i].nameb;
                localMatched = true;
                break;
            }
        }
        if (localMatched) break;
    }
    const updateEntitlements = function (_0x3e8ed5 = '', _0x3f084e = '', _0xb03324 = false) {
        var _0x1fbd1c = {
            'KLRWZ': function _0x37281e(_0x1d1719, _0x45ba1d) {
                return _0x1d1719 || _0x45ba1d;
            },
            'nEMfd': function _0x217a34(_0x101c9d, _0x26425e) {
                return _0x101c9d === _0x26425e;
            },
            'UXBku': function _0x427d2e(_0x305962, _0x5afe7c) {
                return _0x305962 && _0x5afe7c;
            }
        };
        const _0x7f35dc = _0x1fbd1c.KLRWZ(name, _0x3e8ed5);
        const _0xce62b3 = ids || _0x3f084e;
        const _0x8f5e1f = data || timea;
        const _0x543852 = Object['assign']({}, _0x8f5e1f, timeb);
        if (!anchor) {
            if (_0x1fbd1c.nEMfd('ttl', 'ttl')) {
                pxx.subscriber.non_subscriptions = Object['assign'](pxx.subscriber['non_subscriptions'] || {}, {
                    [_0xce62b3]: [Object['assign']({}, {
                        'id': '888888888'
                    }, _0x543852)]
                });
                pxx.subscriber.other_purchases = Object.assign(pxx.subscriber.other_purchases || {}, {
                    [_0xce62b3]: _0x8f5e1f
                });
            } else {
                data = timea;
                anchor = false;
            }
        }
        if (!_0xb03324 && _0x7f35dc) {
            pxx.subscriber['entitlements'] = Object.assign(pxx.subscriber.entitlements || {}, {
                [_0x7f35dc]: Object.assign({}, _0x8f5e1f, {
                    'product_identifier': _0xce62b3
                })
            });
        }
        pxx.subscriber.subscriptions = Object['assign'](pxx.subscriber.subscriptions || {}, {
            [_0xce62b3]: _0x543852
        });
        if (_0x1fbd1c.UXBku(idb, nameb) && !_0xb03324) {
            pxx.subscriber.entitlements = Object.assign(pxx['subscriber']['entitlements'], {
                [nameb]: Object.assign({}, _0x8f5e1f, {
                    'product_identifier': idb
                })
            });
            pxx.subscriber['subscriptions'] = Object['assign'](pxx.subscriber['subscriptions'], {
                [idb]: _0x543852
            });
        }
    };
    const fetchProductEntitlements = function () {
        var _0x2b7dbb = {
            'tfROA': function _0x1b7b45(_0x334997, _0x74447) {
                return _0x334997 !== _0x74447;
            },
            'YjVtk': function _0x4b5483(_0x4eef7f, _0x2fc7f7) {
                return _0x4eef7f === _0x2fc7f7;
            },
            'XknIp': 'qHy',
            'WZjDD': function _0xf8268e(_0x48d1be, _0x352521) {
                return _0x48d1be !== _0x352521;
            },
            'CQXQH': 'undefined',
            'qLuzf': 'cyx',
            'VuBJu': function _0x583594(_0x3ad91e, _0x1760eb) {
                return _0x3ad91e(_0x1760eb);
            },
            'RaQJm': function _0x3e40dd(_0xe17242, _0x50901d) {
                return _0xe17242 !== _0x50901d;
            },
            'cBuEJ': '错误信息：',
            'lsXyZ': 'https://api.revenuecat.com/v1/product_entitlement_mapping',
            'ySlSr': 'https://api.rc-backup.com/v1/product_entitlement_mapping',
            'AsGfX': function _0x590e56(_0x8f1f41, _0xb8a803) {
                return _0x8f1f41(_0xb8a803);
            }
        };
        const _0xe2f1c8 = {
            'url': _0x2b7dbb.lsXyZ,
            'headers': headers
        };
        const _0x5bf9eb = _0x2b7dbb['ySlSr'];
        const _0x24b2c7 = function (_0x22d141) {
            return new Promise((_0x4bc2db, _0x369fa8) => {
                const _0x1f30d3 = {
                    'url': _0x22d141,
                    'headers': headers
                };
                if (_0x2b7dbb['tfROA'](typeof $task, 'undefined')) {
                    if (_0x2b7dbb.YjVtk(_0x2b7dbb.XknIp, 'qHy')) {
                        $task.fetch(_0x1f30d3).then(_0x2785da => {
                            var _0x3dab98 = {
                                'iPIxK': function _0x46aca4(_0x35c402, _0x59433c) {
                                    return _0x35c402 === _0x59433c;
                                },
                                'LBTsC': 'WQf',
                                'nhfwv': function _0x4ba5e5(_0x5c7ffc, _0x53094e) {
                                    return _0x5c7ffc(_0x53094e);
                                }
                            };
                            if (_0x3dab98.iPIxK(_0x2785da.statusCode, 0xc8)) {
                                if ('xeU' !== _0x3dab98.LBTsC) {
                                    _0x3dab98['nhfwv'](_0x4bc2db, _0x2785da);
                                } else {
                                    console.log('读取 BoxJS 配置失败：' + e.message);
                                }
                            } else {
                                _0x369fa8('HTTP Error: ' + _0x2785da['statusCode']);
                            }
                        }).catch(_0x1e92ed => {
                            var _0x1fc43f = {
                                'dDABa': function _0x40f201(_0x3d9a73, _0x23257e) {
                                    return _0x3d9a73 === _0x23257e;
                                },
                                'qswya': 'gdU',
                                'XaLZA': function _0x4db278(_0x5d8eaa, _0x4b1b7c, _0x5697ae, _0x584f1a) {
                                    return _0x5d8eaa(_0x4b1b7c, _0x5697ae, _0x584f1a);
                                },
                                'bXsQY': 'pro',
                                'zxfgJ': 'com.pxx.pro',
                                'tYMeX': function _0x279887(_0x51256c, _0x3fa85a) {
                                    return _0x51256c(_0x3fa85a);
                                }
                            };
                            if (_0x1fc43f.dDABa('Lqe', _0x1fc43f.qswya)) {
                                console.log('备用方案...');
                                _0x1fc43f.XaLZA(updateEntitlements, _0x1fc43f.bXsQY, _0x1fc43f.zxfgJ, false);
                                _0x1fc43f.tYMeX(finalize, pxx);
                            } else {
                                _0x1fc43f['tYMeX'](_0x369fa8, '请求错误: ' + _0x1e92ed);
                            }
                        });
                    } else {
                        return response;
                    }
                } else if (_0x2b7dbb.WZjDD(typeof $httpClient, _0x2b7dbb.CQXQH)) {
                    $httpClient.get(_0x1f30d3, (_0x576b37, _0x119865, _0xa955ff) => {
                        var _0x2a01fc = {
                            'Rmxos': function _0x37cb86(_0x5382fd, _0x37cf7b) {
                                return _0x5382fd === _0x37cf7b;
                            },
                            'EHQKB': 'Dio',
                            'THNqD': function _0x41001f(_0x43fe3b, _0xfdb240) {
                                return _0x43fe3b(_0xfdb240);
                            },
                            'ySChD': function _0x238bc4(_0xe35519, _0x1e3268) {
                                return _0xe35519 !== _0x1e3268;
                            },
                            'rMOcF': 'NPb',
                            'XoRvW': 'xwe'
                        };
                        if (_0x2a01fc.Rmxos(_0x2a01fc.EHQKB, 'zFQ')) {
                            _0x4bc2db(Object.assign(_0x119865, {
                                'body': _0xa955ff
                            }));
                        } else {
                            if (_0x576b37) {
                                _0x2a01fc.THNqD(_0x369fa8, '请求错误: ' + _0x576b37);
                            } else if (_0x2a01fc.Rmxos(_0x119865['status'], 0xc8)) {
                                _0x2a01fc.THNqD(_0x4bc2db, Object['assign'](_0x119865, {
                                    'body': _0xa955ff
                                }));
                            } else {
                                if (_0x2a01fc['ySChD'](_0x2a01fc.rMOcF, _0x2a01fc.XoRvW)) {
                                    _0x2a01fc['THNqD'](_0x369fa8, 'HTTP Error: ' + _0x119865.status);
                                } else {
                                    pxx.subscriber.non_subscriptions = Object.assign(pxx['subscriber'].non_subscriptions || {}, {
                                        [finalIds]: [Object['assign']({}, {
                                            'id': '888888888'
                                        }, subdata)]
                                    });
                                    pxx.subscriber['other_purchases'] = Object.assign(pxx['subscriber']['other_purchases'] || {}, {
                                        [finalIds]: finalData
                                    });
                                }
                            }
                        }
                    });
                } else if (typeof $https !== _0x2b7dbb.CQXQH) {
                    if (_0x2b7dbb.YjVtk('wiy', _0x2b7dbb['qLuzf'])) {
                        _0x2b7dbb['VuBJu'](_0x369fa8, '请求错误: ' + error);
                    } else {
                        $https.get(_0x1f30d3, (_0x44eb46, _0x18a8b9, _0x15d320) => {
                            var _0x2e0cd2 = {
                                'vTHTQ': function _0x21b57b(_0x9a9317, _0x56baa7) {
                                    return _0x9a9317 === _0x56baa7;
                                },
                                'jIggV': function _0x280e96(_0x401fcf, _0x4e335d) {
                                    return _0x401fcf(_0x4e335d);
                                },
                                'iFgCV': function _0x344ab4(_0x18e5d4, _0x8b0538) {
                                    return _0x18e5d4 === _0x8b0538;
                                },
                                'GSryP': 'deM',
                                'gXaUO': function _0x53dd7b(_0x36fefc, _0x5b4316) {
                                    return _0x36fefc(_0x5b4316);
                                },
                                'vgCVe': '匹配到数据'
                            };
                            if (_0x44eb46) {
                                _0x369fa8('请求错误: ' + _0x44eb46);
                            } else if (_0x2e0cd2.vTHTQ(_0x18a8b9.status, 0xc8)) {
                                if ('ebY' === 'nHn') {
                                    _0x15d320 = timea;
                                    anchor = true;
                                } else {
                                    _0x2e0cd2.jIggV(_0x4bc2db, Object.assign(_0x18a8b9, {
                                        'body': _0x15d320
                                    }));
                                }
                            } else {
                                if (_0x2e0cd2['iFgCV'](_0x2e0cd2.GSryP, _0x2e0cd2.GSryP)) {
                                    _0x2e0cd2['gXaUO'](_0x369fa8, 'HTTP Error: ' + _0x18a8b9['status']);
                                } else {
                                    console.log(_0x2e0cd2.vgCVe);
                                    updateEntitlements();
                                    finalize(pxx);
                                }
                            }
                        });
                    }
                } else if (_0x2b7dbb['RaQJm'](typeof $http, 'undefined')) {
                    $http['get'](_0x1f30d3, (_0xa87b05, _0x30be0b, _0x39861d) => {
                        var _0x1db9fe = {
                            'xPqFS': 'HfI',
                            'mNfaF': function _0x2c8a22(_0x1bf93f, _0x86ea1a) {
                                return _0x1bf93f !== _0x86ea1a;
                            },
                            'jhTCm': 'undefined',
                            'SzSAD': function _0x5c808e(_0xd08bf5, _0x503d2e) {
                                return _0xd08bf5 === _0x503d2e;
                            },
                            'AYoug': function _0x589236(_0x79a65c, _0xba3cdd) {
                                return _0x79a65c === _0xba3cdd;
                            },
                            'VuhYT': 'function',
                            'Vzvdw': '⚠️ 无法检测到 BoxJS 环境！',
                            'exTWG': 'bjJ',
                            'ZDRur': function _0x3e6b4c(_0x1010f8, _0x7309e) {
                                return _0x1010f8(_0x7309e);
                            },
                            'qquTG': function _0x45fe0a(_0x521933, _0xeaa761) {
                                return _0x521933 !== _0xeaa761;
                            },
                            'jETxA': 'bCs',
                            'AbnyA': function _0x41136a(_0x93b559, _0x364a54) {
                                return _0x93b559(_0x364a54);
                            }
                        };
                        if (_0x1db9fe['xPqFS'] !== _0x1db9fe.xPqFS) {
                            if (_0x1db9fe['mNfaF'](typeof $persistentStore, _0x1db9fe.jhTCm) && _0x1db9fe.SzSAD(typeof $persistentStore.read, 'function')) {
                                const _0x4b7b62 = $persistentStore.read(key);
                                console.log('读取 BoxJS 值（$persistentStore）：' + key + ' = ' + _0x4b7b62);
                                return _0x4b7b62;
                            } else if (_0x1db9fe['mNfaF'](typeof $prefs, 'undefined') && _0x1db9fe['AYoug'](typeof $prefs.valueForKey, _0x1db9fe['VuhYT'])) {
                                const _0x4920a9 = $prefs.valueForKey(key);
                                console['log']('读取 BoxJS 值（$prefs）：' + key + ' = ' + _0x4920a9);
                                return _0x4920a9;
                            } else {
                                console.log(_0x1db9fe.Vzvdw);
                            }
                        } else {
                            if (_0xa87b05) {
                                if ('fry' === _0x1db9fe.exTWG) {
                                    const _0x21e1f8 = $prefs.valueForKey(key);
                                    console.log('读取 BoxJS 值（$prefs）：' + key + ' = ' + _0x21e1f8);
                                    return _0x21e1f8;
                                } else {
                                    _0x369fa8('请求错误: ' + _0xa87b05);
                                }
                            } else if (_0x1db9fe.AYoug(_0x30be0b['status'], 0xc8)) {
                                _0x1db9fe.ZDRur(_0x4bc2db, Object.assign(_0x30be0b, {
                                    'body': _0x39861d
                                }));
                            } else {
                                if (_0x1db9fe['qquTG'](_0x1db9fe.jETxA, _0x1db9fe['jETxA'])) {
                                    console.log('无法检测到 BoxJS 环境！');
                                } else {
                                    _0x1db9fe['AbnyA'](_0x369fa8, 'HTTP Error: ' + _0x30be0b.status);
                                }
                            }
                        }
                    });
                } else {
                    _0x369fa8('❌ 不支持的代理工具');
                }
            });
        };
        return _0x2b7dbb['AsGfX'](_0x24b2c7, _0xe2f1c8['url']).then(_0x30cc6e => {
            var _0x16c689 = {
                'yurAc': function _0x1bcabe(_0xed430d, _0x400ce9) {
                    return _0xed430d === _0x400ce9;
                },
                'hUWKm': 'KJT',
                'LKyke': function _0x3411b3(_0x3083b3, _0x465d5d) {
                    return _0x3083b3 > _0x465d5d;
                },
                'fPxAP': function _0x4c63da(_0x4ad207, _0x3e3e6d) {
                    return _0x4ad207 === _0x3e3e6d;
                },
                'iQucO': 'fow',
                'ZgtrX': function _0x5691ea(_0x2ab494, _0x276364) {
                    return _0x2ab494(_0x276364);
                }
            };
            if (_0x16c689.yurAc(_0x16c689.hUWKm, 'KJT')) {
                const _0x54a3f7 = JSON.parse(_0x30cc6e['body']);
                if (_0x54a3f7 && _0x54a3f7.product_entitlement_mapping && _0x16c689.LKyke(Object.keys(_0x54a3f7['product_entitlement_mapping']).length, 0x0)) {
                    return _0x30cc6e;
                } else {
                    if (_0x16c689.fPxAP('fow', _0x16c689.iQucO)) {
                        return _0x16c689['ZgtrX'](_0x24b2c7, _0x5bf9eb);
                    } else {
                        pxx917144686.body = JSON.stringify(responseData);
                        console.log(`成功`);
                    }
                }
            } else {
                updateEntitlements(entitlement, productIdentifier, false);
            }
        }).catch(_0x3c2118 => {
            console.log(_0x2b7dbb.cBuEJ, _0x3c2118);
            return _0x24b2c7(_0x5bf9eb);
        });
    };
    const fallbackSolution = function () {
        var _0x2b7bb9 = {
            'PjUeW': '备用方案...',
            'cUyMy': function _0x4d68ef(_0x2684cc, _0x4c9915, _0x2ca83d, _0x47740d) {
                return _0x2684cc(_0x4c9915, _0x2ca83d, _0x47740d);
            },
            'JOkqc': 'pro',
            'fJJNh': 'com.pxx.pro'
        };
        console['log'](_0x2b7bb9['PjUeW']);
        _0x2b7bb9['cUyMy'](updateEntitlements, _0x2b7bb9.JOkqc, _0x2b7bb9['fJJNh'], false);
        finalize(pxx);
    };
    if (localMatched) {
        console.log('匹配到数据');
        updateEntitlements();
        finalize(pxx);
    } else {
        console['log']('未匹配到数据');
        fetchProductEntitlements()['then'](_0x45471e => {
            var _0x285242 = {
                'UGppO': function _0x1c32b9(_0x49d22b, _0x24c4be) {
                    return _0x49d22b === _0x24c4be;
                },
                'elaOt': function _0x2e0110(_0x70ea47, _0x1118d1) {
                    return _0x70ea47 !== _0x1118d1;
                },
                'iHxkb': 'sQV',
                'hczcZ': 'eCn',
                'WZQWs': function _0x20eda9(_0x5c3347, _0x387ea4, _0x45524a, _0x27379a) {
                    return _0x5c3347(_0x387ea4, _0x45524a, _0x27379a);
                },
                'vGvAY': function _0x286e5c(_0x36bdd1, _0x21466a) {
                    return _0x36bdd1 === _0x21466a;
                },
                'gAjDZ': 'qQI',
                'gHizm': function _0x35d9a0(_0x16bef5, _0x56160e, _0x30839e, _0x197937) {
                    return _0x16bef5(_0x56160e, _0x30839e, _0x197937);
                },
                'CMcSs': function _0xad9547(_0x195a70, _0x5600c2) {
                    return _0x195a70(_0x5600c2);
                },
                'yFnoI': 'x-revenuecat-etag',
                'QrOBW': function _0x3b330f(_0x3fa699) {
                    return _0x3fa699();
                },
                'rtfwb': function _0x2f0801(_0x11b99e, _0x1ef328) {
                    return _0x11b99e(_0x1ef328);
                }
            };
            const _0xb86d05 = JSON['parse'](_0x45471e.body);
            const _0x46b12a = _0xb86d05['product_entitlement_mapping'] || {};
            if (!_0x46b12a || _0x285242.UGppO(Object.keys(_0x46b12a)['length'], 0x0)) {
                console.log('备用方案...');
                fallbackSolution();
                return;
            }
            for (const [_0x5c2f5f, _0x49f256] of Object.entries(_0x46b12a)) {
                if (_0x285242['elaOt'](_0x285242.iHxkb, _0x285242.hczcZ)) {
                    const _0x4a3e76 = _0x49f256.product_identifier;
                    const _0x1a9aec = _0x49f256.entitlements || [];
                    if (_0x1a9aec.length === 0x0) {
                        _0x285242['WZQWs'](updateEntitlements, '', _0x4a3e76, true);
                    } else {
                        if (_0x285242.vGvAY(_0x285242.gAjDZ, 'qQI')) {
                            for (const _0x29a710 of _0x1a9aec) {
                                _0x285242.gHizm(updateEntitlements, _0x29a710, _0x4a3e76, false);
                            }
                        } else {
                            _0x285242['CMcSs'](resolve, Object.assign(_0x45471e, {
                                'body': data
                            }));
                        }
                    }
                } else {
                    delete headers[_0x285242['yFnoI']];
                    delete headers['X-RevenueCat-ETag'];
                    pxx917144686.headers = headers;
                    _0x285242.QrOBW(finalize);
                }
            }
            _0x285242.rtfwb(finalize, pxx);
        }).catch(_0x1d9ae9 => {
            var _0x89f1af = {
                'FvYDx': 'Error:'
            };
            console.log(_0x89f1af.FvYDx, _0x1d9ae9);
            fallbackSolution();
        });
    }
};
(function (_0x450ab1, _0x3425ae, _0x43b5b7) {
    var _0x1a4f34 = function () {
        var _0xb3a033 = true;
        return function (_0x17cfdf, _0x2ca7d3) {
            var _0x3242f1 = _0xb3a033 ? function () {
                if (_0x2ca7d3) {
                    var _0x5f080c = _0x2ca7d3.apply(_0x17cfdf, arguments);
                    _0x2ca7d3 = null;
                    return _0x5f080c;
                }
            } : function () {};
            _0xb3a033 = false;
            return _0x3242f1;
        };
    }();
    var _0x4c1f63 = _0x1a4f34(this, function () {
        var _0x463a33 = function () {
                return 'dev';
            },
            _0x35eb8f = function () {
                return 'window';
            };
        var _0x55da08 = function () {
            var _0x336066 = new RegExp('\\w+ *\\(\\) *{\\w+ *[\'|\"].+[\'|\"];? *}');
            return !_0x336066['test'](_0x463a33['toString']());
        };
        var _0x3b9a9d = function () {
            var _0x51c869 = new RegExp('(\\\\[x|u](\\w){2,4})+');
            return _0x51c869['test'](_0x35eb8f['toString']());
        };
        var _0x5610d1 = function (_0x12f5e8) {
            var _0x40a7dc = ~-0x1 >> 0x1 + 0xff % 0x0;
            if (_0x12f5e8['indexOf']('i' === _0x40a7dc)) {
                _0x439553(_0x12f5e8);
            }
        };
        var _0x439553 = function (_0x5ddf24) {
            var _0x1b3611 = ~-0x4 >> 0x1 + 0xff % 0x0;
            if (_0x5ddf24['indexOf']((!![] + '')[0x3]) !== _0x1b3611) {
                _0x5610d1(_0x5ddf24);
            }
        };
        if (!_0x55da08()) {
            if (!_0x3b9a9d()) {
                _0x5610d1('indеxOf');
            } else {
                _0x5610d1('indexOf');
            }
        } else {
            _0x5610d1('indеxOf');
        }
    });
    _0x4c1f63();
    var _0x209a02 = {
        'XwjGl': function _0xc6411c(_0x337a01, _0x1887d8) {
            return _0x337a01 !== _0x1887d8;
        },
        'uHkzY': 'VXj',
        'OiuZn': function _0x51f22f(_0x49c210, _0x51edb6) {
            return _0x49c210(_0x51edb6);
        },
        'bxoyO': 'ert',
        'dUVPV': 'undefined',
        'qnkej': function _0x5cf991(_0x278f40, _0x4818cc) {
            return _0x278f40 + _0x4818cc;
        },
        'WkNXh': '版本号',
        'besSh': '删除版本号'
    };
    _0x43b5b7 = 'al';
    try {
        if (_0x209a02.XwjGl(_0x209a02.uHkzY, _0x209a02.uHkzY)) {
            _0x209a02.OiuZn(reject, 'HTTP Error: ' + response.statusCode);
        } else {
            _0x43b5b7 += _0x209a02['bxoyO'];
            _0x3425ae = encode_version;
            if (!(_0x209a02['XwjGl'](typeof _0x3425ae, _0x209a02['dUVPV']) && _0x3425ae === 'jsjiami.com.v5')) {
                _0x450ab1[_0x43b5b7](_0x209a02.qnkej('删除', _0x209a02.WkNXh));
            }
        }
    } catch (_0x4a1d7e) {
        _0x450ab1[_0x43b5b7](_0x209a02.besSh);
    }
}(window));;
encode_version = 'jsjiami.com.v5';
