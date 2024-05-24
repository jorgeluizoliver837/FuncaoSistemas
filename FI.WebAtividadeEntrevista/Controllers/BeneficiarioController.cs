using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        // GET: Beneficiario
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoCliente bo = new BoCliente();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
                          if (bo.VerificarExistenciaBeneficiario(model.CPF))
            {
                Response.StatusCode = 400;

                return Json(string.Join(Environment.NewLine, "CPF Já Cadastrado"));
            }


            {

                model.ID = bo.IncluirBeneficiario(new Beneficiario()
                {
                
                    NOME = model.NOME,
                    CPF = model.CPF,
                    IDCLIENTE = model.IDCLIENTE
                    
                  
                });


                return Json("Cadastro efetuado com sucesso");
            }
        }

        [HttpPost]
        public JsonResult BeneficiarioList(long id)
        {
            try
            {
             
                List<Beneficiario> beneficiarios = new BoCliente().ListarBeneficiario(id);

                //Return result to jTable
                return Json(beneficiarios.ToList());
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

    }
}