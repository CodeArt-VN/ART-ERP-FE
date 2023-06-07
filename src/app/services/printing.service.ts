import { Injectable } from '@angular/core';
import * as qz from 'qz-tray';
import { KJUR, KEYUTIL, stob64, hextorstr } from 'jsrsasign';
import { EnvService } from './core/env.service';

@Injectable({
  providedIn: 'root'
})
export class PrintingService {

  constructor(
    public env: EnvService,
  ) {  }

  print(printers) {
      return new Promise((resolve, reject) => {
          this.QZsetCertificate().then(() => {
              this.QZsignMessage().then(() => {
                  this.sendQZTray(printers).then(() => {
                      resolve(true);
                  }).catch(err => {
                      reject('false')
                  });
              });
          });
      });
  }

  async QZsetCertificate() {
    /// Authentication setup ///
    qz.security.setCertificatePromise(function (resolve, reject) {
        resolve(
            "-----BEGIN CERTIFICATE-----\n" +
            "MIIEJzCCAw+gAwIBAgIUP4UAUIrS+ZMLzXTc4ZGmFwtrtZwwDQYJKoZIhvcNAQEL\n" +
            "BQAwgaIxCzAJBgNVBAYTAlZOMRQwEgYDVQQIDAtIbyBDaGkgTWluaDESMBAGA1UE\n" +
            "BwwJUGh1IE5odWFuMRMwEQYDVQQKDApJbmhvbGRpbmdzMRYwFAYDVQQLDA1pbmhv\n" +
            "bGRpbmdzLnZuMRkwFwYDVQQDDBBQT1MgUHJpbnQgQ2xpZW50MSEwHwYJKoZIhvcN\n" +
            "AQkBFhJ0ZXN0QGluaG9sZGluZ3Mudm4wHhcNMjIwOTI1MTM1NTI3WhcNMjMwOTI1\n" +
            "MTM1NTI3WjCBojELMAkGA1UEBhMCVk4xFDASBgNVBAgMC0hvIENoaSBNaW5oMRIw\n" +
            "EAYDVQQHDAlQaHUgTmh1YW4xEzARBgNVBAoMCkluaG9sZGluZ3MxFjAUBgNVBAsM\n" +
            "DWluaG9sZGluZ3Mudm4xGTAXBgNVBAMMEFBPUyBQcmludCBDbGllbnQxITAfBgkq\n" +
            "hkiG9w0BCQEWEnRlc3RAaW5ob2xkaW5ncy52bjCCASIwDQYJKoZIhvcNAQEBBQAD\n" +
            "ggEPADCCAQoCggEBAJBf111zS/Dr3uMyFapT7ke2gv1iBgvh7jUdYZBVtKLie3S0\n" +
            "zkZ2wtNiixDT9eJ77B1itYidy5ytL2RBHXqDzWNpostQIf8eU8fD4jnYwTw35ngd\n" +
            "6xEEqIBaM4EO4J4J7KAH4gsCM2h3nWCvj2J1doyuOHct1Z5vw9zgeYFFyBILbdqn\n" +
            "USA9UfomJvyxJUpqEbshS74vk/Y2GkOGvysvmkhEQSo2QIbh2b4+TAcSeAKshmM+\n" +
            "tUfS51+97BtdpHmm9HbtqKbfYByu6/Fs8yNeeeNS/XmiubHJCipBSoMZpN/60sfw\n" +
            "kJ76P9R9Z0WY7aHZ0BvETxjY1anIWpISTehKH/UCAwEAAaNTMFEwHQYDVR0OBBYE\n" +
            "FHoXLOUeEJNf0ZmULwH/17usIuFLMB8GA1UdIwQYMBaAFHoXLOUeEJNf0ZmULwH/\n" +
            "17usIuFLMA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAIDcSH81\n" +
            "qVyxDJvZs8LfjbgsctIAjYhp/LgC+22JwfWykg5ZVJ5gFXnxdVgZlLywmAQUQRwb\n" +
            "TCZtI9k4jDznqOIeh5j8ikiufQA/OSn6qjnhsQSsKiTi0XraHAzC2r+PSOHQ8eOL\n" +
            "iNeguOD3K0DwlJo9rG55O3vNf9fxTxA0vGt90+ghrBeVU5xnE6v0FBlwA/zenZKn\n" +
            "MQnaBcbRZZoZGNXmvRQTIj1ZRU3DoAVS2eynSn8+wV7K63Aaoxj2lGvabGY20UVr\n" +
            "mWO/G3e2a+816GZtiPkn7dmLgy5+n5KysSemi8WaYeuG2A5GxElVAhiLu3Gydlur\n" +
            "y9qArmIOTNgB+Ck=\n" +
            "-----END CERTIFICATE-----\n"
        );
    });
  }

  async QZsignMessage() {
      var privateKey = "-----BEGIN PRIVATE KEY-----\n" +
          "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQX9ddc0vw697j\n" +
          "MhWqU+5HtoL9YgYL4e41HWGQVbSi4nt0tM5GdsLTYosQ0/Xie+wdYrWIncucrS9k\n" +
          "QR16g81jaaLLUCH/HlPHw+I52ME8N+Z4HesRBKiAWjOBDuCeCeygB+ILAjNod51g\n" +
          "r49idXaMrjh3LdWeb8Pc4HmBRcgSC23ap1EgPVH6Jib8sSVKahG7IUu+L5P2NhpD\n" +
          "hr8rL5pIREEqNkCG4dm+PkwHEngCrIZjPrVH0udfvewbXaR5pvR27aim32Acruvx\n" +
          "bPMjXnnjUv15ormxyQoqQUqDGaTf+tLH8JCe+j/UfWdFmO2h2dAbxE8Y2NWpyFqS\n" +
          "Ek3oSh/1AgMBAAECggEAGb6lcloZfCQrcjsfpuhhkLMoh5N/vYWzyw/qsmi+Fd+q\n" +
          "ISUOtXz+/9/OKZmKerEbaSANfAebY9x0G34LCipPqT8Qkw2+ijY3vWMeR69xwdG8\n" +
          "DMZVAQtiGsU68vQatMPTSLQvKERjs2jFDRUxTd7hXXPByOrI8YA/nnb+48D0TNct\n" +
          "RR4P7VBacMSrdjfwvqpaODrWPgoQoONoVU5uDsnWPWEaO/rAM4Io9ziPawrM4zuq\n" +
          "gu4lFCT+87Sbbhm6mq8VKUQRAB9vnDKO1MXqW5eIGvMnO+o7Ow0OWylPk/bp+6sc\n" +
          "BPQcC4ht4CjjfdXZ8/ZGyCgV4cXyycXa6qxwlIDDYQKBgQDJC4Z1d/TMXK6XjraG\n" +
          "TCmlqWp2d1AopO1c7fNnBXZU8+ZHKWEOY/EX+GjOT7yUoAw9rFW0fISfddmOXb0m\n" +
          "nDakpJ4mZ3/vgIK2lWMtGNFk1JtZMOBIvhYRrYJBXzUeWJ5LwxtpDeWHjRYn0TSC\n" +
          "kmj1Z8KRdeaBXicRXOUbQFdqxQKBgQC31rCAzng3QYx0BGVjzUeOEJ4fyqDXlkk6\n" +
          "RK45ugQfJ380dOObFKOd6nh0cqVJY1Y82bnJDIoBJKRBpGj6dIG4HhO+kkxEcgXJ\n" +
          "DQe4+W8tQK2rr9ODce9VZ/nec3nYpq83jgvt+UaL0cwWSgIh4LM+sVvvsaYj4971\n" +
          "A0omy5/zcQKBgEO9cGawLnmVWPaUDYgerYG2Hbsg5I9tUtUXEAZMXtys+ZBMrvks\n" +
          "T5XmC1pIn5/sdXNqV85ijkU0bkN77jnONNMw7GDASukmAeUHXM1bKWKyCE37G/cm\n" +
          "pUT7k4H3VGyPK3cXnGq/VfFgZnCwGuNL9bWKapKciThZwwwkosWV3l6JAoGAWfcu\n" +
          "mVpxalkhqwUbuSOUiOmI+HXpEJfzbhh+SrHFoplpnvo1CIepKna8TABu8uMyKMVE\n" +
          "Lid8weJ0n8sdtLOfZ8MQVoqx2C0Ut7cwuE0ZI0QruYFqOUFgpqMjnMFWN7gat01E\n" +
          "eUksRPB+t8mwEXQtQ9j37O07KQUy7ySU/TdZJ4ECgYEAj8K18PVHKqVGrWL6/s+J\n" +
          "TfrOPwZXa3Hr/P8Cc01wewKZA9RTisl2cMp3k0YwGiIs8Ki51en7F230iC3tg2Vo\n" +
          "7xIo4TXmLNfXSq2L5RyMqDmMVmUMOwcEFs6rqXKc2xeMeY31995cfY+x7wkAdS8V\n" +
          "E7blzos2DBPw7nGs7E2/YRE=\n" +
          "-----END PRIVATE KEY-----\n" +
          "";

      qz.security.setSignatureAlgorithm("SHA512"); // Since 2.1
      qz.security.setSignaturePromise(function (toSign) {
          return function (resolve, reject) {
              try {

                  var pk = KEYUTIL.getKey(privateKey);
                  var sig = new KJUR.crypto.Signature({ "alg": "SHA512withRSA" });  // Use "SHA1withRSA" for QZ Tray 2.0 and older
                  sig.init(pk);
                  sig.updateString(toSign);
                  var hex = sig.sign();
                  // console.log("DEBUG: \n\n" + stob64(hextorstr(hex)));
                  resolve(stob64(hextorstr(hex)));
              } catch (err) {
                  console.error(err);
                  reject('false');
              }
          };
      });
  }

  async sendQZTray(printers) {
    let qzPrinters = [];
    let qzDatas = [];


    let ConnectOption =
    {
      host: printers[0].Printer.Host,
      keepAlive: 60,
      retries: 0,
    }

    return new Promise(async (resolve, reject) => { 
      await this.QZConnect(ConnectOption, printers).then(() => {
        if (qz.websocket.isActive()) {
            this.QZFindPrinter(null, ConnectOption, printers).then(async (printersDB: any) => {
                if (printers.length != 0 && printersDB) {
                    printers.forEach(p => {
                      // // ------PRODUCTION-----
                      // if (printersDB.indexOf(p.Printer.Code) > -1) {
                      //     let config = qz.configs.create(p.Printer.Code);
                      //     for (let idx = 0; idx < p.Printer.Times; idx++) {
                      //       qzPrinters.push(config);
                      //       qzDatas.push(p.Printer.Data);
                      //     }
                      // }
                      // else {
                      //     this.env.showTranslateMessage("Printer " + p + " Not Found! Check Printers Info Database!", "warning");
                      // }
                      // // ----------------------


                      // ------TEST----
                      for (let idx = 0; idx < p.Printer.Times; idx++) {
                          let config = qz.configs.create("Microsoft Print to PDF"); // USE For test
                          qzPrinters.push(config);
                          qzDatas.push(p.Printer.Data);
                      }
                      // ---------------
                    });
                }
                else {
                  this.env.showTranslateMessage("No Printers Available, Please Check Printers' IP  / Printers' Power", "warning");
                }

                if (qzPrinters.length != 0 && qzDatas.length != 0) {
                  await this.QZActualPrinting(qzPrinters, qzDatas, ConnectOption, printers).then(async (result: any) => {
                    resolve(result);
                    return this.QZCloseConnection();
                  }).catch(err => {
                    reject('false');
                  });
                }
            }).catch(err => {
              reject('false');
            });
          }
      }).catch(err => {
        reject('false');
      });
    });
  }

  async ConnectionPrompt(options, printers) {
      return new Promise((resolve, reject) => {
          this.env.showPrompt('Bạn có muốn tiếp tục in?', options.host, 'Có lỗi khi gọi đến server').then(_ => {
            this.QZCloseConnection().then(() => {
                this.sendQZTray(printers);
            });
          }).catch(_ => {
              reject('false');
              this.QZCloseConnection();
          });
      });
  }

  async QZConnect(options, printers) {
    return new Promise((resolve, reject) => {
      let checkCon = qz.websocket.isActive();
      if (!checkCon)
          return qz.websocket.connect(options).then(() => {
              resolve(true);
          }).catch(err => {
              this.ConnectionPrompt(options, printers).catch(() => {
                  reject('false');
              });
          });
    });
  }

  async QZFindPrinter(printerCode = null, options, printers) {
      return new Promise((resolve, reject) => {
          if (printerCode == null) {
              return qz.printers.find().then(data => {
                  resolve(data);
              }).catch(err => {
                  this.ConnectionPrompt(options, printers).catch(() => {
                    reject('false');
                });
              });
          }
          else {
              return qz.printers.find(printerCode).then(data => {
                  resolve(data);
              }).catch(err => {
                  this.ConnectionPrompt(options, printers).catch(() => {
                    reject('false');
                  });
              });
          }
      });
  }

  async QZGetDefaultPrinter(signature = null, signingTimestamp = null) {
      return qz.printers.getDefault(signature, signingTimestamp);
  }

  async QZActualPrinting(qzPrinters, qzDatas, options, printers) {
      return new Promise((resolve, reject) => {
          qz.print(qzPrinters, qzDatas, true).then(() => {
              resolve(true);
          }).catch(err => {
              this.ConnectionPrompt(options, printers).catch(() => {
                reject('false');
              });
          });
      });
  }

  async QZCloseConnection() {
      let checkCon = qz.websocket.isActive();
      if (checkCon) {
          return qz.websocket.disconnect();
      }
  }
}
