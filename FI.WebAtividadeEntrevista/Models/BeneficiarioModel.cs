using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Models
{
    public class BeneficiarioModel
    {
        public long ID { get; set; }

        /// <summary>
        /// CEP
        /// </summary>

        public string NOME { get; set; }

        /// <summary>
        /// Sobrenome
        /// </summary>

        [Required]
        [MaxLength(14)]
        public string CPF { get; set; }

        public long IDCLIENTE { get; set; }

        /// <summary>
        /// CEP
        /// </summary>

    }
}